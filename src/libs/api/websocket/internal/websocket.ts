import { fromEvent, ignoreElements, merge, mergeMap, Observable, shareReplay, Subject, take, throwError } from 'rxjs';
import { map, share, takeUntil } from 'rxjs/operators';
import type NodeWebSocket from 'ws';
import { isBrowser } from '../../common';
import { debugWebsocket } from './debug-websocket';

export interface MessageDeserializer<T> {
  (event: MessageEvent | NodeWebSocket.MessageEvent): T;
}

const defaultDeserializer: MessageDeserializer<any> = (message: MessageEvent | NodeWebSocket.MessageEvent) => message.data;

interface Options<T> {
  protocols?: string | string[];
  clientOptions?: NodeWebSocket.ClientOptions;
  deserializer?: MessageDeserializer<T>;
  debug?: boolean;
}

export class RxWebSocket<DeserializedMessage> extends Subject<DeserializedMessage> {
  readonly #websocket: WebSocket | NodeWebSocket;
  readonly #open$: Observable<Event | NodeWebSocket.OpenEvent>;

  constructor(url: string, { protocols, clientOptions, deserializer = defaultDeserializer, debug = false }: Options<DeserializedMessage>) {
    super();

    const websocket = isBrowser() ? new WebSocket(url, protocols) : (new (require('ws'))(url, protocols, clientOptions) as WebSocket);
    if (debug) {
      debugWebsocket(websocket);
    }

    const open$ = fromEvent<Event | NodeWebSocket.OpenEvent>(websocket, 'open').pipe(take(1), shareReplay());
    const error$ = fromEvent<Event | NodeWebSocket.ErrorEvent>(websocket, 'error').pipe(take(1), shareReplay());
    const close$ = fromEvent<CloseEvent | NodeWebSocket.CloseEvent>(websocket, 'close').pipe(take(1), share());
    const message$ = fromEvent<MessageEvent | NodeWebSocket.MessageEvent>(websocket, 'message').pipe(takeUntil(close$), shareReplay(1));

    merge(open$.pipe(ignoreElements()), message$.pipe(map(deserializer)), error$.pipe(mergeMap(throwError)), close$.pipe(ignoreElements())).subscribe(this);
    this.#open$ = open$;
    this.#websocket = websocket;
  }

  send(data: string) {
    this.#open$.subscribe(() => this.#websocket.send(data));

    return this;
  }

  close() {
    this.#websocket.close();
    this.unsubscribe();
  }
}
