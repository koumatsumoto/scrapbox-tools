import { BehaviorSubject, firstValueFrom, interval, mergeMap } from 'rxjs';
import { first, takeUntil, timeout } from 'rxjs/operators';
import { CONFIG, packetTypes } from './constants';
import { isConnectionMessage, isResponseMessageOf, isResponseOf, scrapboxDeserializer, scrapboxSerializer, toSocketIoMessagePayload } from './internal/message';
import { ChangeRequestCreateParams, createChanges } from './internal/request';
import { CommitResponse, JoinRoomResponse, SendResponse } from './internal/response';
import { getAuthCookieValue, isNotNull } from './internal/util';
import { RxWebSocket } from './internal/websocket';

export class ScrapboxWebsocketHandler {
  private socket$ = new BehaviorSubject<RxWebSocket | null>(null);
  private room: { projectId: string; pageId: string } | null = null;
  private sid = 0;

  constructor(
    private readonly options: {
      token?: string; // required if node.js
      autoOpen?: boolean;
      autoReconnect?: boolean;
      debug?: boolean;
    },
  ) {}

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

  private send<T extends SendResponse>({ data, projectId, pageId }: { data: any; projectId: string; pageId: string }) {
    const sid = String(this.sid++);

    return firstValueFrom(
      this.getSocket().pipe(
        first(isNotNull),
        mergeMap((socket) => socket.send(toSocketIoMessagePayload(sid, data)).pipe(first(isResponseMessageOf(sid)), timeout(CONFIG.responseTimeout))),
      ),
    );
  }

  private getSocket() {
    if (!this.socket$.getValue()?.active) {
      return this.openNewSocket();
    }

    return this.socket$.asObservable();
  }

  private openNewSocket() {
    const socket = new RxWebSocket({
      url: CONFIG.endpoint,
      options: { headers: { Origin: CONFIG.origin, Cookie: getAuthCookieValue(this.options.token ?? '') } },
      serializer: scrapboxSerializer,
      deserializer: scrapboxDeserializer,
      debug: this.options.debug,
    });

    return socket.message.pipe(
      first(isConnectionMessage),
      mergeMap(([, data]) => {
        return socket.send(packetTypes.connected).pipe(
          first(isResponseOf(packetTypes.connected)),
          mergeMap(() => {
            interval(data.pingInterval)
              .pipe(takeUntil(socket.message))
              .subscribe(() => socket.send(packetTypes.ping));

            this.socket$.next(socket);
            return this.socket$.asObservable();
          }),
        );
      }),
    );
  }
}
