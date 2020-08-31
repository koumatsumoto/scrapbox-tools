import { interval, NEVER, Observable } from 'rxjs';
import { ID } from '../common';
import { headers } from './constants';
import { CommitChangeParam, createChanges } from './internal/request/commit-change-param';
import { createMessage } from './internal/request/create-message';
import { getScrapboxWebsocketResponseStreams, waitForResponse } from './internal/response/message-and-stream';
import { getDefaultWebsocket, getScrapboxWebsocketAuthOptions, Websocket } from './internal/websocket/getter';
import { isOpen } from './internal/websocket/util';
import { CommitResponsePayload, JoinRoomResponsePayload, SendResponsePayload, WebsocketRequestPayload } from './types';

export class WebsocketClient {
  private response$: Observable<{ sid: string; data: SendResponsePayload }> = NEVER;
  private open$: Observable<unknown> = NEVER;

  private socket!: Websocket;
  // currently joined-room, need cache to re-join on reconnect
  private room: { projectId: string; pageId: string } | null = null;

  // wait request until connection opened
  private sid = 0;

  constructor(private readonly token = '', private readonly websocketGetterFunction = getDefaultWebsocket) {
    this.initialize();
  }

  commit(param: { projectId: string; userId: ID; pageId: string; parentId: string; changes: CommitChangeParam[] }) {
    return this.send<CommitResponsePayload[]>({
      method: 'commit',
      data: {
        kind: 'page',
        userId: param.userId,
        projectId: param.projectId,
        pageId: param.pageId,
        parentId: param.parentId,
        changes: createChanges(param.changes, param.userId),
        cursor: null,
        freeze: true,
      },
    });
  }

  joinRoom(param: { projectId: string; pageId: string }) {
    this.room = param;
    return this.send<JoinRoomResponsePayload[]>({
      method: 'room:join',
      data: {
        pageId: param.pageId,
        projectId: param.projectId,
        projectUpdatesStream: false,
      },
    });
  }

  /**
   * Connect to websocket and register events.
   */
  private initialize() {
    if (this.socket) {
      this.socket.close();
    }

    this.socket = this.websocketGetterFunction(getScrapboxWebsocketAuthOptions(this.token));
    const { close, open, initialize, response } = getScrapboxWebsocketResponseStreams(this.socket);

    this.open$ = open;
    this.response$ = response;
    close.subscribe(() => this.initialize()); // retry if disconnected
    initialize.subscribe((message) => {
      // start ping
      interval(message.data.pingInterval).subscribe(() => this.socket.send(headers.ping));
      // for reconnection after closed
      if (this.room) {
        this.joinRoom(this.room);
      }
    });
  }

  private async send<T extends SendResponsePayload>(payload: WebsocketRequestPayload) {
    const [sid, data] = createMessage(this.getIdAndIncrement(), payload);

    if (isOpen(this.socket)) {
      this.socket.send(data);
    } else {
      this.open$.subscribe(() => this.socket.send(data));
    }

    return waitForResponse(this.response$, sid) as Promise<T>;
  }

  private getIdAndIncrement() {
    return String(this.sid++);
  }
}
