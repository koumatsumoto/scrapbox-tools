import {
  BehaviorSubject,
  concat,
  concatMap,
  delayWhen,
  filter,
  iif,
  interval,
  lastValueFrom,
  mapTo,
  mergeMap,
  Observable,
  of,
  shareReplay,
  skip,
  Subject,
  take,
  tap,
} from 'rxjs';
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

interface Room {
  projectId: string;
  pageId: string;
}

const isSameRoom = (a: Room | null, b: Room | null) => {
  return a?.projectId === b?.projectId && a?.pageId === b?.pageId;
};

export class ScrapboxWebsocketHandler {
  #sid = 0;
  #socket$: Observable<RxWebSocket<DeserializedMessage>>;
  #joinRequest$ = new BehaviorSubject<Room | null>(null);
  #joinResult$ = new BehaviorSubject<Room | null>(null);
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

    this.#joinRequest$
      .pipe(
        takeUntil(this.#close$),
        concatMap((room) =>
          iif(
            () => isSameRoom(this.#joinResult$.getValue(), room),
            of(room),
            of(room).pipe(
              delayWhen(() =>
                this.#send<JoinRoomResponse[]>({
                  method: 'room:join',
                  data: { pageId: room?.pageId, projectId: room?.projectId, projectUpdatesStream: false },
                }),
              ),
            ),
          ),
        ),
      )
      .subscribe(this.#joinResult$);
  }

  async commit({
    userId,
    projectId,
    pageId,
    parentId,
    changes,
  }: {
    userId: string;
    projectId: string;
    pageId: string;
    parentId: string;
    changes: ChangeRequestCreateParams[];
  }) {
    return lastValueFrom(
      concat(
        this.#joinResult$.pipe(
          tap(() => this.#joinRequest$.next({ projectId, pageId })),
          skip(1), // ignore cache of BehaviorSubject
          take(1),
        ),
        this.#send<CommitResponse[]>({
          method: 'commit',
          data: { kind: 'page', userId, projectId, pageId, parentId, changes: createChanges(changes, userId), cursor: null, freeze: true },
        }),
      ),
    );
  }

  close() {
    this.#close$.next(undefined);
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
