import { ID } from '../../public-api';
import { CommitChangeParam, createChanges } from './internal/commit-change-param';
import { parseMessage } from './internal/parse-message';
import { isCommitResponsePayload, isCommitSuccessResponsePayload } from './internal/response';
import {
  WebsocketRequestPayload,
  ConnectionOpenResponsePayload,
  WebsocketResponsePayload,
  CommitResponsePayload,
  JoinRoomResponsePayload,
} from './types';

const endpoint = 'wss://scrapbox.io/socket.io/?EIO=3&transport=websocket';
const headers = {
  initialize: '0',
  ping: '2',
  pong: '3',
  connected: '40',
  // e.g.
  //   * 42: 'cursor'
  //   * 42X: user custom request (X is arbitrary natural number to specify response)
  send: '42',
  // e.g.
  //   * 43X: response to user custom request (X is number used for request)
  receive: '43',
};

type InternalMessage = { senderId: string | null; data: WebsocketResponsePayload };

class WebsocketMessageEvent extends EventTarget {
  dispatch(data: InternalMessage) {
    this.dispatchEvent(new CustomEvent('message-received', { detail: data }));
  }

  subscribe(type: 'message-received', listener: (e: CustomEvent<InternalMessage>) => void) {
    super.addEventListener(type, listener as any);
  }

  unsubscribe(type: 'message-received', listener: (e: CustomEvent<InternalMessage>) => void) {
    super.removeEventListener(type, listener as any);
  }
}

const awaitResponse = (emitter: WebsocketMessageEvent, id: string) =>
  new Promise<WebsocketResponsePayload>((resolve, reject) => {
    const handle = (e: CustomEvent<InternalMessage>) => {
      if (e.detail.senderId === id) {
        resolve(e.detail.data);
        emitter.unsubscribe('message-received', handle);
      }
    };

    emitter.subscribe('message-received', handle);
    // timeout for memory leak
    setTimeout(() => {
      emitter.unsubscribe('message-received', handle);
      reject(new Error('[websocket-client] timeout for response'));
    }, 1000 * 30);
  });

export class WebsocketClient {
  private socket!: WebSocket;
  private readonly event: WebsocketMessageEvent;
  // to re-join on reconnect
  private joinedRoom: { projectId: string; pageId: string } | null = null;

  // wait request until connection opened
  private pendingRequests: Function[] = [];
  private senderId = 0;

  // DI for testing
  constructor(socket = new WebSocket(endpoint), event = new WebsocketMessageEvent()) {
    this.event = event;
    this.initialize(socket);
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
    this.joinedRoom = param;
    return this.send<JoinRoomResponsePayload[]>({
      method: 'room:join',
      data: {
        pageId: param.pageId,
        projectId: param.projectId,
        projectUpdatesStream: false,
      },
    });
  }

  disjoinRoom() {
    if (!this.joinedRoom) {
      return;
    }

    const projectId = this.joinedRoom.projectId;
    this.joinedRoom = null;
    return this.send<JoinRoomResponsePayload[]>({
      method: 'room:join',
      data: {
        pageId: null,
        projectId,
        projectUpdatesStream: false,
      },
    });
  }

  // unsubscribe is not implemented, no need currently
  onIncomingMessage(callback: (v: WebsocketResponsePayload) => unknown) {
    const fn = (e: CustomEvent<InternalMessage>) => callback(e.detail.data);
    this.event.subscribe('message-received', fn);
  }

  onCommitIdUpdated(callback: (v: { pageId: string; commitId: string }) => unknown) {
    const fn = (e: CustomEvent<InternalMessage>) => {
      if (isCommitResponsePayload(e.detail.data)) {
        e.detail.data
          .filter(isCommitSuccessResponsePayload)
          .map((i) => i.data.commitId)
          .forEach((commitId) => {
            if (!this.joinedRoom) {
              return;
            }
            callback({ commitId, pageId: this.joinedRoom.pageId });
          });
      }
    };
    this.event.subscribe('message-received', fn);
  }

  private async send<T extends WebsocketResponsePayload = WebsocketResponsePayload>(payload: WebsocketRequestPayload): Promise<T> {
    const body = JSON.stringify(['socket.io-request', payload]);
    const sid = `${this.senderId++}`;
    const data = `${headers.send}${sid}${body}`;

    if (this.socket.readyState !== WebSocket.OPEN) {
      this.pendingRequests.push(() => this.socket.send(data));
    } else {
      this.socket.send(data);
    }

    return awaitResponse(this.event, sid) as Promise<T>;
  }

  /**
   * Connect to websocket and register events.
   */
  private initialize(socket = new WebSocket(endpoint)) {
    if (this.socket) {
      this.socket.close();
    }

    this.socket = socket;
    this.socket.addEventListener(
      'open',
      () => {
        /* noop */
      },
      { once: true },
    );
    // reconnect on error and close
    this.socket.addEventListener('close', () => this.initialize(), { once: true });
    this.socket.addEventListener('error', () => this.socket.close(), { once: true });
    this.socket.addEventListener('message', (ev: MessageEvent) => this.handleMessage(ev));

    // for re-initialize
    if (this.joinedRoom) {
      this.joinRoom(this.joinedRoom);
    }
  }

  // for incoming messages
  private handleMessage(event: MessageEvent) {
    if (typeof event.data !== 'string') {
      throw new Error('unexpected data received');
    }

    const message = event.data;
    const [header, data] = parseMessage(message);

    // message just after connection opened
    if (header === headers.initialize) {
      this.setPingAndConsumeBuffer(data as ConnectionOpenResponsePayload);
      return;
    }
    // for own send() result
    if (header.startsWith(headers.receive)) {
      const senderId = header.slice(headers.receive.length);
      this.event.dispatch({ senderId, data: data });
      return;
    }
    // for updation by other users
    if (header === headers.send) {
      this.event.dispatch({ senderId: null, data: data });
      return;
    }
  }

  private setPingAndConsumeBuffer(data: ConnectionOpenResponsePayload) {
    // ping interval is specified from server
    setInterval(() => this.socket.send('2'), data.pingInterval);

    // consume buffer
    this.pendingRequests.forEach((f) => f());
    this.pendingRequests = [];
  }
}
