import { fromEvent, merge, mergeMap, Observable, shareReplay, Subject, take, throwError } from 'rxjs';
import { first, map, takeUntil, timeout } from 'rxjs/operators';
import type NodeWebSocket from 'ws';
import { isBrowser } from '../../common';
import { debugWebsocket } from './debug-websocket';

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

export class RxWebSocket<DeserializedMessage> extends Subject<WebSocketEvents> {
  readonly #websocket: WebSocket | NodeWebSocket;
  readonly #message$: Observable<DeserializedMessage>;

  constructor(url: string, { protocols, clientOptions, deserializer = defaultDeserializer, debug = false }: Options<DeserializedMessage>) {
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
    events$.subscribe(this);
  }

  send(data: string) {
    this.#websocket.send(data);

    return this;
  }

  get message() {
    return this.#message$;
  }

  messageOf(responseSelector: (data: DeserializedMessage) => boolean, timeoutMs?: number) {
    return timeoutMs ? this.#message$.pipe(first(responseSelector), timeout(timeoutMs)) : this.#message$.pipe(first(responseSelector));
  }

  close() {
    this.#websocket.close();
    this.complete();
  }
}
