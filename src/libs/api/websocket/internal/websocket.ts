import { fromEvent, merge, mergeMap, Observable, shareReplay, Subject, take, tap, throwError } from 'rxjs';
import { map, share, takeUntil } from 'rxjs/operators';
import type NodeWebSocket from 'ws';
import { isBrowser } from '../../common';

export interface MessageDeserializer<T> {
  (event: MessageEvent | NodeWebSocket.MessageEvent): T;
}

const defaultDeserializer: MessageDeserializer<any> = (message: MessageEvent | NodeWebSocket.MessageEvent) => message.data;

type WebSocketEvents =
  | Event
  | NodeWebSocket.OpenEvent
  | MessageEvent
  | NodeWebSocket.MessageEvent
  | NodeWebSocket.ErrorEvent
  | CloseEvent
  | NodeWebSocket.CloseEvent;

interface Options<T> {
  protocols?: string | string[];
  clientOptions?: NodeWebSocket.ClientOptions;
  deserializer?: MessageDeserializer<T>;
  debug?: boolean;
}

export class RxWebSocket<DeserializedMessage> {
  readonly #websocket: WebSocket | NodeWebSocket;
  readonly #opened$: Observable<Event | NodeWebSocket.OpenEvent>;
  readonly #message$: Observable<DeserializedMessage>;
  readonly #events$ = new Subject<WebSocketEvents>();

  constructor(url: string, { protocols, clientOptions, deserializer = defaultDeserializer, debug = false }: Options<DeserializedMessage>) {
    const websocket = isBrowser() ? new WebSocket(url, protocols) : (new (require('ws'))(url, protocols, clientOptions) as NodeWebSocket);
    const close$ = fromEvent<CloseEvent | NodeWebSocket.CloseEvent>(websocket as WebSocket, 'close').pipe(take(1), share());
    const open$ = fromEvent<Event | NodeWebSocket.OpenEvent>(websocket as WebSocket, 'open').pipe(takeUntil(close$), shareReplay(1), take(1));
    const message$ = fromEvent<MessageEvent | NodeWebSocket.MessageEvent>(websocket as WebSocket, 'message').pipe(takeUntil(close$), shareReplay(1));
    const error$ = fromEvent<Event | NodeWebSocket.ErrorEvent>(websocket as WebSocket, 'error').pipe(takeUntil(close$), mergeMap(throwError));
    merge(open$, message$, error$, close$).subscribe(this.#events$);

    this.#websocket = websocket;
    this.#opened$ = open$;
    this.#message$ = message$.pipe(map(deserializer));

    if (debug) {
      this.#events$.subscribe((ev) => console.log(`[websocket] event: ${ev.type},`, (ev as any)?.data));
      this.#websocket.send = new Proxy(this.#websocket.send, {
        apply: (target, thisArg, args) => {
          console.log('[websocket] send:', args[0]);

          return target.call(this.#websocket, args[0]);
        },
      });
    }
  }

  get active() {
    return !this.#events$.closed;
  }

  get message() {
    return this.#message$;
  }

  send(data: string) {
    return this.#opened$.pipe(
      mergeMap(() => {
        this.#websocket.send(data);

        return this.message;
      }),
    );
  }
}
