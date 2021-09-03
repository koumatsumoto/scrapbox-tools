import { fromEvent, merge, Observable, shareReplay, Subject, throwError } from 'rxjs';
import { first, map, mergeMap, takeUntil, take, timeout } from 'rxjs/operators';
import type NodeWebSocket from 'ws';
import { isBrowser } from '../common';
import { debugWebsocket } from './internal';

export interface MessageSerializer<T> {
  (data: T): string;
}
export interface MessageDeserializer<T> {
  (event: MessageEvent | NodeWebSocket.MessageEvent): T;
}

const defaultSerializer = (data: unknown) => String(data);
const defaultDeserializer = (message: MessageEvent | NodeWebSocket.MessageEvent) => message.data;

type WebSocketEvents =
  | Event
  | NodeWebSocket.OpenEvent
  | MessageEvent
  | NodeWebSocket.MessageEvent
  | NodeWebSocket.ErrorEvent
  | CloseEvent
  | NodeWebSocket.CloseEvent;

export class RxWebSocket<Request, Response> extends Subject<WebSocketEvents> {
  readonly #websocket: WebSocket | NodeWebSocket;
  readonly #message$: Observable<Response>;
  readonly #serializer: MessageSerializer<Request>;

  constructor(
    url: string,
    {
      protocols,
      clientOptions,
      serializer = defaultSerializer,
      deserializer = defaultDeserializer,
      debug = false,
    }: {
      protocols?: string | string[];
      clientOptions?: NodeWebSocket.ClientOptions;
      serializer?: MessageSerializer<Request>;
      deserializer?: MessageDeserializer<Response>;
      debug?: boolean;
    },
  ) {
    super();

    const websocket = isBrowser() ? new WebSocket(url, protocols) : (new (require('ws'))(url, protocols, clientOptions) as WebSocket);
    if (debug) {
      debugWebsocket(websocket);
    }

    const open$ = fromEvent<Event | NodeWebSocket.OpenEvent>(websocket, 'open').pipe(take(1));
    const error$ = fromEvent<Event | NodeWebSocket.ErrorEvent>(websocket, 'error').pipe(take(1));
    const close$ = fromEvent<CloseEvent | NodeWebSocket.CloseEvent>(websocket, 'close').pipe(take(1));
    const message$ = fromEvent<MessageEvent | NodeWebSocket.MessageEvent>(websocket, 'message').pipe(takeUntil(close$), shareReplay(1));
    const events$ = merge(open$, message$, error$.pipe(mergeMap(throwError)), close$).pipe(takeUntil(close$), shareReplay(1));

    this.#websocket = websocket;
    this.#message$ = message$.pipe(map(deserializer));
    this.#serializer = serializer;
    events$.subscribe(this);
  }

  send(data: Request) {
    this.#websocket.send(this.#serializer(data));

    return this;
  }

  get message() {
    return this.#message$;
  }

  messageOf<T extends Response>(predicate: (value: Response) => value is T, timeoutMs?: number): Observable<T>;
  messageOf<T extends Response>(predicate: (value: Response) => boolean, timeoutMs?: number): Observable<Response>;
  messageOf<T extends Response>(predicate: (value: Response) => value is T, timeoutMs?: number): Observable<T> {
    const response = this.#message$.pipe(first(predicate));

    return timeoutMs ? response.pipe(timeout(timeoutMs)) : response;
  }

  close() {
    this.#websocket.close();
    this.complete();
  }
}
