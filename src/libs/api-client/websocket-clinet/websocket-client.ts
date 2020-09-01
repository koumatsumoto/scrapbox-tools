import { interval, NEVER, Observable } from 'rxjs';
import { ID } from '../common';
import { socketIoHeaders } from './constants';
import { createMessage } from './internal/message';
import {
  createCommitPayload,
  createJoinPayload,
  RequestPayload,
  CommitResponsePayload,
  JoinRoomResponsePayload,
  SendResponsePayload,
} from './internal/payload';
import { ChangeRequestParams } from './internal/request';
import { getScrapboxWebsocketResponseStreams, retrieveResponse } from './internal/response';
import { getDefaultWebsocket, getScrapboxWebsocketAuthOptions, Websocket } from './internal/websocket/getter';
import { isOpen } from './internal/websocket/util';

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

  commit(params: { projectId: string; userId: ID; pageId: string; parentId: string; changes: ChangeRequestParams[] }) {
    return this.send<CommitResponsePayload[]>(createCommitPayload(params));
  }

  join(params: { projectId: string; pageId: string }) {
    this.room = params;
    return this.send<JoinRoomResponsePayload[]>(createJoinPayload(params));
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
      interval(message.data.pingInterval).subscribe(() => this.socket.send(socketIoHeaders.ping));
      // for reconnection after closed
      if (this.room) {
        this.join(this.room);
      }
    });
  }

  private async send<T extends SendResponsePayload>(payload: RequestPayload) {
    const [sid, data] = createMessage(this.getIdAndIncrement(), payload);

    if (isOpen(this.socket)) {
      this.socket.send(data);
    } else {
      this.open$.subscribe(() => this.socket.send(data));
    }

    return retrieveResponse(this.response$, sid) as Promise<T>;
  }

  private getIdAndIncrement() {
    return String(this.sid++);
  }
}
