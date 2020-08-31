import { fromEvent, interval, never, Observable, Subject } from 'rxjs';
import { filter, first, map, takeUntil, timeout } from 'rxjs/operators';
import { ID } from '../common';
import { endpoint, headers, origin, websocketResponseTimeout } from './constants';
import { CommitChangeParam, createChanges } from './internal/commit-change-param';
import { parseMessage } from './internal/parse-message';
import { IsomorphicWebsocket } from './isomorphic-websocket';
import { CommitResponsePayload, ConnectionOpenResponsePayload, JoinRoomResponsePayload, WebsocketRequestPayload, WebsocketResponsePayload } from './types';

const websocketEventNames = {
  open: 'open',
  message: 'message',
  error: 'error',
  close: 'close',
};

export const scrapboxIsomorphicWebsocketGetterFn = (token?: string) => {
  const WebsocketConstructor = typeof globalThis.WebSocket === 'function' ? globalThis.WebSocket : require('ws');

  const options = token
    ? {
        headers: {
          Origin: origin,
          Cookie: `connect.sid=${token}`,
        },
      }
    : undefined;

  return new WebsocketConstructor(endpoint, undefined, options);
};

const handleMessage = (event: { data: unknown }) => {
  if (typeof event.data !== 'string') {
    return {
      type: 'error',
      error: new Error('UnexpectedResponseError'),
    } as const;
  }

  const [header, data] = parseMessage(event.data);
  switch (header) {
    // just after connection opened
    case headers.initialize: {
      return {
        type: 'initialized',
        data: data as ConnectionOpenResponsePayload,
      } as const;
    }
    // updates from other users
    case headers.send: {
      return {
        type: 'notification',
        data,
      } as const;
    }
    default: {
      // result of this.send()
      if (header.startsWith(headers.receive)) {
        return {
          type: 'response',
          sid: header.slice(headers.receive.length),
          data,
        } as const;
      }

      return {
        type: 'others',
        data,
      } as const;
    }
  }
};

const isOpen = (socket: IsomorphicWebsocket) => socket.readyState === socket.OPEN;

const createMessage = (id: string, payload: WebsocketRequestPayload) => {
  const body = JSON.stringify(['socket.io-request', payload]);

  return [id, `${headers.send}${id}${body}`] as const;
}

export const waitForFirstResponse = <T>(
  response$: Observable<{ sid: string; data: T }>,
  sid: string,
  timeoutMs = websocketResponseTimeout,
) =>
  response$
    .pipe(
      timeout(timeoutMs),
      first((response) => response.sid === sid),
      map((response) => response.data),
    )
    .toPromise();

export class WebsocketClient {
  private readonly response$ = new Subject<{ sid: string; data: WebsocketResponsePayload }>();
  private open$: Observable<any> = never();

  private socket!: IsomorphicWebsocket;
  // currently joined-room, need cache to re-join on reconnect
  private room: { projectId: string; pageId: string } | null = null;

  // wait request until connection opened
  private sid = 0;

  constructor(private readonly token?: string) {
    this.initialize();
  }

  commit(param: { projectId: string; userId: ID; pageId: string; parentId: string; changes: CommitChangeParam[] }) {
    return this.send<CommitResponsePayload[]>({
      method: 'commit',
      data: {
        kind: 'page',
        userId: param.userId,
        projectId: param.projectId,
        pageId: param.pageId,
        parentId: param.parentId,
        changes: createChanges(param.changes, param.userId),
        cursor: null,
        freeze: true,
      },
    });
  }

  joinRoom(param: { projectId: string; pageId: string }) {
    this.room = param;
    return this.send<JoinRoomResponsePayload[]>({
      method: 'room:join',
      data: {
        pageId: param.pageId,
        projectId: param.projectId,
        projectUpdatesStream: false,
      },
    });
  }

  /**
   * Connect to websocket and register events.
   */
  private initialize() {
    if (this.socket) {
      this.socket.close();
    }

    this.socket = scrapboxIsomorphicWebsocketGetterFn(this.token);
    const close$ = fromEvent(this.socket, websocketEventNames.close).pipe(first());
    this.open$ = fromEvent(this.socket, websocketEventNames.open).pipe(first());
    const message$ = fromEvent<{ data: unknown }>(this.socket, websocketEventNames.message).pipe(takeUntil(close$), map(handleMessage));

    close$.subscribe(() => this.initialize()); // retry if disconnected
    message$.pipe(filter((v) => v.type === 'response')).subscribe((message) => this.response$.next({ sid: message.sid!, data: message.data }));
    message$.pipe(filter((v) => v.type === 'initialized')).subscribe((message) => {
      interval((message.data as ConnectionOpenResponsePayload).pingInterval).subscribe(() => this.socket.send(headers.ping));
      // for reconnect after closed
      if (this.room) {
        this.joinRoom(this.room);
      }
    });
  }

  private async send<T extends WebsocketResponsePayload = WebsocketResponsePayload>(payload: WebsocketRequestPayload) {
    const [sid, data] = createMessage(this.getIdAndIncrement(), payload);

    if (isOpen(this.socket)) {
      this.socket.send(data);
    } else {
      this.open$.subscribe(() => this.socket.send(data));
    }

    return (await waitForFirstResponse(this.response$.asObservable(), sid) as T;
  }

  private getIdAndIncrement() {
    return String(this.sid++);
  }
}
