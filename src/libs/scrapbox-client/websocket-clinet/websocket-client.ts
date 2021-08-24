import { firstValueFrom, interval, Observable } from 'rxjs';
import { first, map, shareReplay, take, takeUntil, tap, timeout } from 'rxjs/operators';
import { CONFIG, packetTypes } from './constants';
import { isConnectionMessage, isResponseMessageOf, ParsedMessage, parseMessage, toSocketIoMessagePayload } from './internal/message';
import { ChangeRequestCreateParams, createChanges } from './internal/request';
import { CommitResponse, JoinRoomResponse, SendResponse } from './internal/response';
import { getCookieToAuth } from './internal/util';
import { getEventStream, getWebSocket } from './internal/websocket';

export class WebsocketClient {
  private socket!: WebSocket;
  private open$!: Observable<Event>;
  private error$!: Observable<Event>;
  private close$!: Observable<CloseEvent>;
  private message$!: Observable<ParsedMessage>;

  // currently joined-room, need cache to re-join on reconnect
  private room: { projectId: string; pageId: string } | null = null;

  // wait request until connection opened
  private sid = 0;

  constructor(
    private readonly config: {
      // required if node.js
      token?: string;
      websocketConstructor?: typeof getWebSocket;
      responseTimeout?: number;
    } = {},
  ) {
    this.initialize();
  }

  commit(params: { projectId: string; userId: string; pageId: string; parentId: string; changes: ChangeRequestCreateParams[] }) {
    return this.send<CommitResponse[]>({
      method: 'commit',
      data: {
        kind: 'page',
        userId: params.userId,
        projectId: params.projectId,
        pageId: params.pageId,
        parentId: params.parentId,
        changes: createChanges(params.changes, params.userId),
        cursor: null,
        freeze: true,
      },
    });
  }

  join(params: { projectId: string; pageId: string }) {
    this.room = params;

    return this.send<JoinRoomResponse[]>({
      method: 'room:join',
      data: {
        pageId: params.pageId,
        projectId: params.projectId,
        projectUpdatesStream: false,
      },
    });
  }

  private initialize() {
    this.socket = this.openWebSocket();
    const { open, error, close, message } = getEventStream(this.socket);

    this.open$ = open.pipe(shareReplay());
    this.error$ = error.pipe(shareReplay());
    this.close$ = close.pipe(shareReplay());
    this.message$ = message.pipe(map((event) => parseMessage(event.data)));

    this.registerInitializationOnOpen();
    this.registerReconnectionOnClose();
  }

  private async send<T extends SendResponse>(data: any) {
    const sid = String(this.sid++);
    const message = toSocketIoMessagePayload(sid, data);

    this.socket.send(message);

    return firstValueFrom(this.message$.pipe(first(isResponseMessageOf(sid)), timeout(CONFIG.responseTimeout)));
  }

  private openWebSocket() {
    const getSocket = this.config.websocketConstructor ?? getWebSocket;

    return getSocket({ ...CONFIG, cookie: getCookieToAuth(this.config.token ?? '') });
  }

  private registerInitializationOnOpen() {
    this.message$.pipe(first(isConnectionMessage)).subscribe(([, data]) => {
      this.socket.send(packetTypes.connected);
      // start ping
      interval(data.pingInterval)
        .pipe(takeUntil(this.close$))
        .subscribe(() => this.socket.send(packetTypes.ping));
      // for reconnection after closed
      if (this.room) {
        this.join(this.room);
      }
    });
  }

  private registerReconnectionOnClose() {
    this.close$.subscribe(() => this.initialize());
  }
}
