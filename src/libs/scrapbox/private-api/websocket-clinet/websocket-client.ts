import { ID } from '../../public-api';
import { CommitChangeParam, createChanges } from './internal/commit-change-param';
import { parseMessage } from './internal/parse-message';
import { getIsomorphicWebsocketConstructor, IsomorphicWebsocket, registerIsomorphicEventHandling } from './isomorphic-websocket';
import {
  CommitResponsePayload,
  ConnectionOpenResponsePayload,
  JoinRoomResponsePayload,
  WebsocketRequestPayload,
  WebsocketResponsePayload,
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

export const scrapboxIsomorphicWebsocketGetterFn = () => {
  const WebsocketConstructor = getIsomorphicWebsocketConstructor();

  return new WebsocketConstructor(endpoint);
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
  private readonly websocketGetterFn: typeof scrapboxIsomorphicWebsocketGetterFn;
  private socket!: IsomorphicWebsocket;
  private readonly event: WebsocketMessageEvent;
  // to re-join on reconnect
  private joinedRoom: { projectId: string; pageId: string } | null = null;

  // wait request until connection opened
  private pendingRequests: Function[] = [];
  private senderId = 0;

  constructor(
    websocketGetterFn = scrapboxIsomorphicWebsocketGetterFn, // for testing param
    event = new WebsocketMessageEvent(),
  ) {
    this.websocketGetterFn = websocketGetterFn;
    this.event = event;
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

  private async send<T extends WebsocketResponsePayload = WebsocketResponsePayload>(payload: WebsocketRequestPayload): Promise<T> {
    const body = JSON.stringify(['socket.io-request', payload]);
    const sid = `${this.senderId++}`;
    const data = `${headers.send}${sid}${body}`;

    if (this.socket.readyState !== WebSocket.OPEN) {
      this.pendingRequests.push(() => this.socket.send(data));
    } else {
      this.socket.send(data);
    }

    try {
      return (await awaitResponse(this.event, sid)) as T;
    } catch (e) {
      console.error(
        '[websocket-client] send error',
        JSON.stringify({
          readyState: this.socket.readyState,
          pendingRequestCount: this.pendingRequests.length,
        }),
        null,
        2,
      );
      throw e;
    }
  }

  /**
   * Connect to websocket and register events.
   */
  private initialize() {
    if (this.socket) {
      this.socket.close();
    }

    const socket = this.websocketGetterFn();
    this.socket = socket;
    registerIsomorphicEventHandling(socket, {
      onMessage: (ev) => this.handleMessage(ev),
      onErrorOrClose: () => this.initialize(), // do reconnect
    });

    // on reconnect
    if (this.joinedRoom) {
      this.joinRoom(this.joinedRoom);
    }
  }

  // for incoming messages
  private handleMessage(event: { data: unknown }) {
    if (typeof event.data !== 'string') {
      throw new Error('unexpected data received');
    }
    const [header, data] = parseMessage(event.data);

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
