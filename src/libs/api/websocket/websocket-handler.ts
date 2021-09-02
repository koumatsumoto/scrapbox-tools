import { concatMap, delayWhen, filter, firstValueFrom, interval, mapTo, mergeMap, Observable, of, shareReplay, Subject, take, tap } from 'rxjs';
import { first, takeUntil, timeout } from 'rxjs/operators';
import { constants } from '../common';
import {
  DeserializedMessage,
  isConnectionMessage,
  isResponseMessageOf,
  isResponseOf,
  scrapboxDeserializer,
  toSocketIoMessagePayload,
} from './internal/message';
import { ChangeRequestCreateParams, createChanges } from './internal/request';
import { CommitResponse, JoinRoomResponse, SendResponse } from './internal/response';
import { getAuthCookieValue } from './internal/utils';
import { RxWebSocket } from './internal/websocket';

interface Options {
  token?: string; // required if node.js env
  autoOpen?: boolean;
  autoReconnect?: boolean;
  debug?: boolean;
}

export class ScrapboxWebsocketHandler {
  #room: { projectId: string; pageId: string } | null = null;
  #sid = 0;
  #socket$: Observable<RxWebSocket<DeserializedMessage>>;
  #close$ = new Subject();

  constructor({ token = '', debug }: Options) {
    this.#socket$ = new Observable<RxWebSocket<DeserializedMessage>>((subscriber) => {
      const socket = new RxWebSocket(constants.websocket.endpoint, {
        clientOptions: { headers: { Origin: constants.websocket.origin, Cookie: getAuthCookieValue(token) } },
        deserializer: scrapboxDeserializer,
        debug,
      });

      socket
        .pipe(
          takeUntil(this.#close$),
          filter(isConnectionMessage),
          // send ack
          tap(() => {
            socket.send(constants.websocket.packetTypes.connected);
          }),
          // set ping
          tap(([, data]) =>
            interval(data.pingInterval)
              .pipe(takeUntil(socket))
              .subscribe(() => socket.send(constants.websocket.packetTypes.ping)),
          ),
          delayWhen(() => socket.pipe(first(isResponseOf(constants.websocket.packetTypes.connected)))),
          mapTo(socket),
          timeout(constants.websocket.responseTimeout),
        )
        .subscribe(subscriber);

      return () => socket.close();
    }).pipe(shareReplay(1));
  }

  close() {
    this.#close$.next(undefined);
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
    return firstValueFrom(
      this.#join({ projectId, pageId }).pipe(
        concatMap(() => {
          return this.#send<CommitResponse[]>({
            method: 'commit',
            data: { kind: 'page', userId, projectId, pageId, parentId, changes: createChanges(changes, userId), cursor: null, freeze: true },
          });
        }),
      ),
    );
  }

  #join({ projectId, pageId }: { projectId: string; pageId: string }) {
    return this.#room?.projectId === projectId && this.#room?.pageId === pageId
      ? of({})
      : this.#send<JoinRoomResponse[]>({
          method: 'room:join',
          data: { pageId, projectId, projectUpdatesStream: false },
        }).pipe(
          tap({
            complete: () => {
              this.#room = { projectId, pageId };
            },
          }),
        );
  }

  #send<T extends SendResponse>(data: any) {
    const sid = String(this.#sid++);

    return this.#socket$.pipe(
      take(1),
      mergeMap((socket) =>
        socket.send(toSocketIoMessagePayload(sid, data)).pipe(first(isResponseMessageOf(sid)), timeout(constants.websocket.responseTimeout)),
      ),
    );
  }
}
