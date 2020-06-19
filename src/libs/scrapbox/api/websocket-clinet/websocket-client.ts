import { Subject } from 'rxjs';
import { first, map, timeout } from 'rxjs/operators';
import { ID } from '../../util';
import { endpoint, headers, origin, websocketResponseTimeout } from './constants';
import { CommitChangeParam, createChanges } from './internal/commit-change-param';
import { parseMessage } from './internal/parse-message';
import { IsomorphicWebsocket, registerIsomorphicWebsocketEventHandling } from './isomorphic-websocket';
import {
  CommitResponsePayload,
  ConnectionOpenResponsePayload,
  JoinRoomResponsePayload,
  WebsocketRequestPayload,
  WebsocketResponsePayload,
} from './types';

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

export class WebsocketClient {
  // messages from server
  private readonly response$ = new Subject<{ sid: string | null; data: WebsocketResponsePayload }>();
  private socket!: IsomorphicWebsocket;
  // currently joined-room, need cache to re-join on reconnect
  private room: { projectId: string; pageId: string } | null = null;

  // wait request until connection opened
  private pendingRequests: Function[] = [];
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
    registerIsomorphicWebsocketEventHandling(this.socket, {
      onOpen: () => {
        // on reconnect
        if (this.room) {
          this.joinRoom(this.room);
        }
      },
      onMessage: (ev) => this.handleResponse(ev),
      onErrorOrClose: () => this.initialize(), // do reconnect
    });
  }

  private async send<T extends WebsocketResponsePayload = WebsocketResponsePayload>(payload: WebsocketRequestPayload): Promise<T> {
    const body = JSON.stringify(['socket.io-request', payload]);
    const sid = `${this.sid++}`;
    const data = `${headers.send}${sid}${body}`;

    if (this.socket.readyState !== this.socket.OPEN) {
      this.pendingRequests.push(() => this.socket.send(data));
    } else {
      this.socket.send(data);
    }

    return this.response$
      .pipe(
        timeout(websocketResponseTimeout),
        first((response) => response.sid === sid),
        map((response) => response.data),
      )
      .toPromise() as Promise<T>;
  }

  // for incoming messages
  private handleResponse(event: { data: unknown }) {
    if (typeof event.data !== 'string') {
      throw new Error('unexpected data received');
    }
    const [header, data] = parseMessage(event.data);

    // message just after connection opened
    if (header === headers.initialize) {
      this.setPingAndConsumeBuffer(data as ConnectionOpenResponsePayload);
    } else if (header.startsWith(headers.receive)) {
      // for own send() result
      const sid = header.slice(headers.receive.length);
      this.response$.next({ sid, data });
    } else if (header === headers.send) {
      // for updation by other users
      this.response$.next({ sid: null, data });
    }
  }

  private setPingAndConsumeBuffer(data: ConnectionOpenResponsePayload) {
    // ping interval is specified from server
    setInterval(() => this.socket.send(headers.ping), data.pingInterval);

    // consume buffer
    this.pendingRequests.forEach((f) => f());
    this.pendingRequests = [];
  }
}
