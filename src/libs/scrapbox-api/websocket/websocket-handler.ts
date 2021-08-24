import { concatMap, firstValueFrom, interval, Subject } from 'rxjs';
import { first, takeUntil, timeout } from 'rxjs/operators';
import { CONFIG, packetTypes } from './constants';
import { IsomorphicWebSocket } from './internal/isomorphic-websocket';
import {
  isConnectionMessage,
  isResponseMessageOf,
  isResponseOf,
  ParsedMessage,
  scrapboxDeserializer,
  scrapboxSerializer,
  toSocketIoMessagePayload,
} from './internal/message';
import { ChangeRequestCreateParams, createChanges } from './internal/request';
import { CommitResponse, JoinRoomResponse, SendResponse } from './internal/response';
import { getAuthCookieValue } from './internal/util';

export class ScrapboxWebsocketHandler {
  private socket: IsomorphicWebSocket | null = null;
  private room: { projectId: string; pageId: string } | null = null;
  private sid = 0;
  private readonly request$ = new Subject<{ sid: string; data: any; projectId: string; pageId: string }>();
  private readonly response$ = new Subject<{ sid: string; result: any }>();

  constructor(
    private readonly options: {
      token?: string; // required if node.js
      autoOpen?: boolean;
      autoReconnect?: boolean;
    },
  ) {
    this.request$
      .pipe(
        concatMap(async ({ sid, data, projectId, pageId }) => {
          const socket = await this.getActiveSocket();
          socket.send(toSocketIoMessagePayload(sid, data));
          const result = await firstValueFrom(socket.message.pipe(first(isResponseMessageOf(sid)), timeout(CONFIG.responseTimeout)));

          return { sid, result };
        }),
      )
      .subscribe(this.response$);
  }

  async commit({
    projectId,
    userId,
    pageId,
    parentId,
    changes,
  }: {
    projectId: string;
    userId: string;
    pageId: string;
    parentId: string;
    changes: ChangeRequestCreateParams[];
  }) {
    await this.join({ projectId, pageId });

    return this.send<CommitResponse[]>({
      projectId,
      pageId,
      data: {
        method: 'commit',
        data: { kind: 'page', userId, projectId, pageId, parentId, changes: createChanges(changes, userId), cursor: null, freeze: true },
      },
    });
  }

  async join({ projectId, pageId }: { projectId: string; pageId: string }) {
    // join room if needed
    if (this.room?.projectId === projectId && this.room?.pageId === pageId) {
      return;
    }

    await this.send<JoinRoomResponse[]>({
      projectId,
      pageId,
      data: {
        method: 'room:join',
        data: { pageId, projectId, projectUpdatesStream: false },
      },
    });

    this.room = { projectId, pageId };
  }

  private async send<T extends SendResponse>({ data, projectId, pageId }: { data: any; projectId: string; pageId: string }) {
    const sid = String(this.sid++);
    this.request$.next({ sid, data, projectId, pageId });

    return firstValueFrom(this.response$.pipe(first(isResponseOf(sid)), timeout(CONFIG.responseTimeout)));
  }

  private async getActiveSocket() {
    if (this.socket && this.socket.readyState < 2) {
      return this.socket;
    }

    const socket = await this.openNewSocket();
    this.room = null;

    return (this.socket = socket);
  }

  private async openNewSocket() {
    const socket = new IsomorphicWebSocket<ParsedMessage>({
      url: CONFIG.endpoint,
      options: { headers: { Origin: CONFIG.origin, Cookie: getAuthCookieValue(this.options.token ?? '') } },
      serializer: scrapboxSerializer,
      deserializer: scrapboxDeserializer,
    });

    const [, data] = await firstValueFrom(socket.message.pipe(first(isConnectionMessage)));
    socket.send(packetTypes.connected);

    interval(data.pingInterval)
      .pipe(takeUntil(socket.close))
      .subscribe(() => socket.send(packetTypes.ping));

    return socket;
  }
}
