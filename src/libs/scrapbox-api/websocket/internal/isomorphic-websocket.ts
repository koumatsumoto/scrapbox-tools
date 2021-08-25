import { fromEvent, Observable, Subject } from 'rxjs';
import { first, map, share, shareReplay, takeUntil } from 'rxjs/operators';
import type NodeWebSocket from 'ws';
import { isBrowser } from '../../common/env';

export const defaultSerializer = (data: any): string => JSON.stringify(data);
export const defaultDeserializer = (message: MessageEvent | NodeWebSocket.MessageEvent) => message.data;

export interface MessageDeserializer<T = MessageEvent | NodeWebSocket.MessageEvent, U = any> {
  (event: T): U;
}
export interface MessageSerializer<T = any, U = any> {
  (event: T): U;
}

export class IsomorphicWebSocket<ParsedMessage = any> {
  readonly environment = isBrowser() ? 'browser' : 'node';
  readonly websocket: WebSocket | NodeWebSocket;
  private readonly open$: Observable<Event | NodeWebSocket.OpenEvent>;
  private readonly error$: Observable<Event | NodeWebSocket.ErrorEvent>;
  private readonly close$: Observable<CloseEvent | NodeWebSocket.CloseEvent>;
  private readonly message$: Observable<ParsedMessage>;
  private readonly send$ = new Subject<any>();

  get readyState() {
    return this.websocket.readyState;
  }

  constructor({
    url,
    protocols,
    options,
    serializer = defaultSerializer,
    deserializer = defaultDeserializer,
  }: {
    url: string;
    protocols?: string | string[];
    options?: NodeWebSocket.ClientOptions;
    serializer?: MessageSerializer;
    deserializer?: MessageDeserializer;
  }) {
    this.websocket = this.environment === 'browser' ? new WebSocket(url, protocols) : (new (require('ws'))(url, protocols, options) as NodeWebSocket);
    this.close$ = fromEvent<CloseEvent | NodeWebSocket.CloseEvent>(this.websocket as NodeWebSocket, 'close').pipe(first(), share());
    this.error$ = fromEvent<Event | NodeWebSocket.ErrorEvent>(this.websocket as NodeWebSocket, 'error').pipe(first(), shareReplay(), takeUntil(this.close$));
    this.open$ = fromEvent<Event | NodeWebSocket.OpenEvent>(this.websocket as NodeWebSocket, 'open').pipe(first(), shareReplay(), takeUntil(this.close$));
    this.message$ = fromEvent<MessageEvent | NodeWebSocket.MessageEvent>(this.websocket as NodeWebSocket, 'message').pipe(
      map(deserializer),
      takeUntil(this.close$),
      shareReplay(),
    );

    this.send$
      .pipe(
        // TODO(fix)
        // delayWhen(() => this.open$),
        map(serializer),
        takeUntil(this.close$),
      )
      .subscribe((message) => this.websocket.send(message));
    this.close$.subscribe(() => {
      this.send$.complete();
    });
  }

  get open() {
    return this.open$;
  }

  get error() {
    return this.error$;
  }

  get close() {
    return this.close$;
  }

  get message() {
    return this.message$;
  }

  send(message: string) {
    this.send$.next(message);
  }
}
