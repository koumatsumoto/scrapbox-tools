import {
  BehaviorSubject,
  concat,
  concatMap,
  delayWhen,
  ignoreElements,
  iif,
  interval,
  lastValueFrom,
  mergeMap,
  Observable,
  of,
  shareReplay,
  skip,
  Subject,
  take,
  tap,
} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { constants } from '../common';
import {
  CommitResultMessage,
  isConnectedMessage,
  isInitializedMessage,
  isResponseMessageOf,
  JoinResultMessage,
  Message,
  packetTypes,
  ResponseMessage,
} from './internal/message';
import { ChangeRequestCreateParams, createChanges } from './internal/request';
import { RequestParam, socketIoMessageDeserializer, socketIoMessageSerializer } from './internal/serializer';
import { RxWebSocket } from './websocket';

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
  #socket$: Observable<RxWebSocket<RequestParam, Message>>;
  #joinRequest$ = new BehaviorSubject<Room | null>(null);
  #joinResult$ = new BehaviorSubject<Room | null>(null);
  #close$ = new Subject();

  constructor({ token = '', debug }: Options) {
    this.#socket$ = new Observable<RxWebSocket<RequestParam, Message>>((subscriber) => {
      const socket = new RxWebSocket(constants.websocket.endpoint, {
        clientOptions: { headers: { Origin: constants.websocket.origin, Cookie: `connect.sid=${token}` } },
        serializer: socketIoMessageSerializer,
        deserializer: socketIoMessageDeserializer,
        debug,
      });

      const connected$ = socket.messageOf(isInitializedMessage);
      connected$.subscribe(({ data }) => {
        // send ack
        socket
          .send(packetTypes.connectedMessage)
          .messageOf(isConnectedMessage)
          .subscribe(() => {
            // set ping
            interval(data.pingInterval)
              .pipe(takeUntil(socket))
              .subscribe(() => socket.send(packetTypes.ping));

            subscriber.next(socket);
          });
      });

      // TODO: use share with { resetOnComplete: true } to allow re-connect
      socket.pipe(ignoreElements(), takeUntil(this.#close$)).subscribe(subscriber);

      return () => socket.close();
    }).pipe(shareReplay(1), take(1));

    this.#joinRequest$
      .pipe(
        takeUntil(this.#close$),
        concatMap((room) =>
          iif(
            () => isSameRoom(this.#joinResult$.getValue(), room),
            of(room),
            of(room).pipe(
              delayWhen(() =>
                this.#send<JoinResultMessage>({
                  method: 'room:join',
                  // TODO(feat): can join without pageId
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
        this.#send<CommitResultMessage>({
          method: 'commit',
          data: { kind: 'page', userId, projectId, pageId, parentId, changes: createChanges(changes, userId), cursor: null, freeze: true },
        }),
      ),
    );
  }

  close() {
    this.#close$.next(undefined);
  }

  #send<T extends ResponseMessage>(data: any) {
    const sid = this.#sid++;

    return this.#socket$.pipe(
      tap((socket) => socket.send([sid, data])),
      mergeMap((socket) => socket.messageOf(isResponseMessageOf<T>(sid), constants.websocket.responseTimeout)),
    );
  }
}
