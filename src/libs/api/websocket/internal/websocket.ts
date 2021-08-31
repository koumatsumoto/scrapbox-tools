import { filter, fromEvent, merge, mergeMap, Observable, shareReplay, Subject, take, throwError } from 'rxjs';
import { map, share, takeUntil } from 'rxjs/operators';
import type NodeWebSocket from 'ws';
import { isBrowser } from '../../common/env';

export interface MessageDeserializer<T = MessageEvent | NodeWebSocket.MessageEvent, U = any> {
  (event: T): U;
}
export interface MessageSerializer<T = any, U = any> {
  (event: T): U;
}

const defaultSerializer: MessageSerializer = (data: any): string => JSON.stringify(data);
const defaultDeserializer: MessageDeserializer = (message: MessageEvent | NodeWebSocket.MessageEvent) => message.data;

type WebSocketEvents =
  | Event
  | NodeWebSocket.OpenEvent
  | MessageEvent
  | NodeWebSocket.MessageEvent
  | NodeWebSocket.ErrorEvent
  | CloseEvent
  | NodeWebSocket.CloseEvent;

const isMessageEvent = (event: WebSocketEvents): event is MessageEvent | NodeWebSocket.MessageEvent => event.type === 'message';

export class RxWebSocket {
  private readonly websocket: WebSocket | NodeWebSocket;
  private readonly opened$: Observable<unknown>;
  private readonly events$ = new Subject<WebSocketEvents>();
  private readonly serializer = defaultSerializer;
  private readonly deserializer = defaultDeserializer;
  private readonly debug: boolean;

  constructor({
    url,
    protocols,
    options,
    serializer = defaultSerializer,
    deserializer = defaultDeserializer,
    debug = false,
  }: {
    url: string;
    protocols?: string | string[];
    options?: NodeWebSocket.ClientOptions;
    serializer?: MessageSerializer;
    deserializer?: MessageDeserializer;
    debug?: boolean;
  }) {
    const websocket = isBrowser() ? new WebSocket(url, protocols) : (new (require('ws'))(url, protocols, options) as NodeWebSocket);
    const close$ = fromEvent<CloseEvent | NodeWebSocket.CloseEvent>(websocket as NodeWebSocket, 'close').pipe(take(1), share());
    const open$ = fromEvent<Event | NodeWebSocket.OpenEvent>(websocket as NodeWebSocket, 'open').pipe(takeUntil(close$), shareReplay(1), take(1));
    const message$ = fromEvent<MessageEvent | NodeWebSocket.MessageEvent>(websocket as NodeWebSocket, 'message').pipe(takeUntil(close$), shareReplay(1));
    const error$ = fromEvent<Event | NodeWebSocket.ErrorEvent>(websocket as NodeWebSocket, 'error').pipe(takeUntil(close$), mergeMap(throwError));

    merge(open$, message$, error$, close$).subscribe(this.events$);

    this.websocket = websocket;
    this.opened$ = open$;
    this.serializer = serializer.bind(this);
    this.deserializer = deserializer.bind(this);
    this.debug = debug;

    if (this.debug) {
      this.events$.subscribe((ev) => console.log(`[websocket] message: type=${ev.type}`, 'data' in ev ? ev.data : undefined));
    }
  }

  get active() {
    return !this.events$.closed;
  }

  get message() {
    return this.events$.asObservable().pipe(filter(isMessageEvent), map(this.deserializer));
  }

  send(data: string) {
    return this.opened$.pipe(
      mergeMap(() => {
        const message = this.serializer(data);

        if (this.debug) {
          console.log('[websocket] send:', message);
        }

        this.websocket.send(message);

        return this.message;
      }),
    );
  }
}
