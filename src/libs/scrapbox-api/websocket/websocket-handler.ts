import { interval } from 'rxjs';
import { first, takeUntil, timeout } from 'rxjs/operators';
import { CONFIG, packetTypes } from './constants';
import { isConnectionMessage, isResponseOf, scrapboxDeserializer, scrapboxSerializer, toSocketIoMessagePayload } from './internal/message';
import { ChangeRequestCreateParams, createChanges } from './internal/request';
import { CommitResponse, JoinRoomResponse, SendResponse } from './internal/response';
import { getAuthCookieValue } from './internal/util';
import { RxWebSocket } from './internal/websocket';

export class ScrapboxWebsocketHandler {
  private socket: RxWebSocket | null = null;
  private room: { projectId: string; pageId: string } | null = null;
  private sid = 0;

  constructor(
    private readonly options: {
      token?: string; // required if node.js
      autoOpen?: boolean;
      autoReconnect?: boolean;
    },
  ) {}

  async commit({
    projectId,
    userId,
    pageId,
    parentId,
    changes,
  }: {
    projectId: string;
    userId: string;
    pageId: string;
    parentId: string;
    changes: ChangeRequestCreateParams[];
  }) {
    await this.join({ projectId, pageId });

    return this.send<CommitResponse[]>({
      projectId,
      pageId,
      data: {
        method: 'commit',
        data: { kind: 'page', userId, projectId, pageId, parentId, changes: createChanges(changes, userId), cursor: null, freeze: true },
      },
    });
  }

  async join({ projectId, pageId }: { projectId: string; pageId: string }) {
    // join room if needed
    if (this.room?.projectId === projectId && this.room?.pageId === pageId) {
      return;
    }

    await this.send<JoinRoomResponse[]>({
      projectId,
      pageId,
      data: {
        method: 'room:join',
        data: { pageId, projectId, projectUpdatesStream: false },
      },
    });

    this.room = { projectId, pageId };
  }

  private async send<T extends SendResponse>({ data, projectId, pageId }: { data: any; projectId: string; pageId: string }) {
    const sid = String(this.sid++);

    this.getActiveSocket()
      .send(toSocketIoMessagePayload(sid, data))
      .pipe(first(isResponseOf(sid)), timeout(CONFIG.responseTimeout));
  }

  private getActiveSocket() {
    return !this.socket?.active ? (this.socket = this.openNewSocket()) : this.socket!;
  }

  private openNewSocket() {
    const socket = new RxWebSocket({
      url: CONFIG.endpoint,
      options: { headers: { Origin: CONFIG.origin, Cookie: getAuthCookieValue(this.options.token ?? '') } },
      serializer: scrapboxSerializer,
      deserializer: scrapboxDeserializer,
    });

    socket.message.pipe(first(isConnectionMessage)).subscribe(([, data]) => {
      socket.send(packetTypes.connected);
      interval(data.pingInterval)
        .pipe(takeUntil(socket.message))
        .subscribe(() => socket.send(packetTypes.ping));
    });

    return socket;
  }
}
