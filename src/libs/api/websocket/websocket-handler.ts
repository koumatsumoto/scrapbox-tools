import { BehaviorSubject, firstValueFrom, interval, mergeMap } from 'rxjs';
import { first, takeUntil, timeout } from 'rxjs/operators';
import { constants } from '../common';
import { isConnectionMessage, isResponseMessageOf, isResponseOf, scrapboxDeserializer, scrapboxSerializer, toSocketIoMessagePayload } from './internal/message';
import { ChangeRequestCreateParams, createChanges } from './internal/request';
import { CommitResponse, JoinRoomResponse, SendResponse } from './internal/response';
import { getAuthCookieValue, isNotNull } from './internal/util';
import { RxWebSocket } from './internal/websocket';

export class ScrapboxWebsocketHandler {
  #socket$ = new BehaviorSubject<RxWebSocket | null>(null);
  #room: { projectId: string; pageId: string } | null = null;
  #sid = 0;

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
    await this.#join({ projectId, pageId });

    return this.#send<CommitResponse[]>({
      method: 'commit',
      data: { kind: 'page', userId, projectId, pageId, parentId, changes: createChanges(changes, userId), cursor: null, freeze: true },
    });
  }

  async #join({ projectId, pageId }: { projectId: string; pageId: string }) {
    // join room if needed
    if (this.#room?.projectId === projectId && this.#room?.pageId === pageId) {
      return;
    }

    await this.#send<JoinRoomResponse[]>({
      method: 'room:join',
      data: { pageId, projectId, projectUpdatesStream: false },
    });

    this.#room = { projectId, pageId };
  }

  #send<T extends SendResponse>(data: any) {
    const sid = String(this.#sid++);

    return firstValueFrom(
      this.#getSocket().pipe(
        first(isNotNull),
        mergeMap((socket) =>
          socket.send(toSocketIoMessagePayload(sid, data)).pipe(first(isResponseMessageOf(sid)), timeout(constants.websocket.responseTimeout)),
        ),
      ),
    );
  }

  #getSocket() {
    if (!this.#socket$.getValue()?.active) {
      return this.#openNewSocket();
    }

    return this.#socket$.asObservable();
  }

  #openNewSocket() {
    const socket = new RxWebSocket({
      url: constants.websocket.endpoint,
      options: { headers: { Origin: constants.websocket.origin, Cookie: getAuthCookieValue(this.options.token ?? '') } },
      serializer: scrapboxSerializer,
      deserializer: scrapboxDeserializer,
      debug: this.options.debug,
    });

    return socket.message.pipe(
      first(isConnectionMessage),
      mergeMap(([, data]) => {
        return socket.send(constants.websocket.packetTypes.connected).pipe(
          first(isResponseOf(constants.websocket.packetTypes.connected)),
          mergeMap(() => {
            interval(data.pingInterval)
              .pipe(takeUntil(socket.message))
              .subscribe(() => socket.send(constants.websocket.packetTypes.ping));

            this.#socket$.next(socket);
            return this.#socket$.asObservable();
          }),
        );
      }),
    );
  }
}
