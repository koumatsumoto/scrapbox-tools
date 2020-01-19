import { createCommitMessage, createJoinRoomMessage, extractMessage } from './websocket-client-internal-functions';
import { CommitChange, ConnectionOpenMessage } from './websocket-client-types';

const endpoint = 'wss://scrapbox.io/socket.io/?EIO=3&transport=websocket';

export class WebsocketClient {
  private readonly socket: WebSocket;
  // need buffer if try to send until connection opened
  private sendBuffer: Function[] = [];

  constructor() {
    this.socket = new WebSocket(endpoint);
    this.initialize();
  }

  commit(param: { projectId: string; userId: string; pageId: string; parentId: string; changes: CommitChange[] }) {
    this.send(createCommitMessage(param));
  }

  joinRoom(param: { projectId: string; pageId: string }) {
    this.send(createJoinRoomMessage(param));
  }

  private send(message: string) {
    if (this.socket.readyState !== WebSocket.OPEN) {
      this.sendBuffer.push(() => this.socket.send(message));

      return;
    }

    this.socket.send(message);
  }

  /**
   * Connect to websocket and register events.
   */
  private initialize() {
    this.socket.addEventListener('open', (event: Event) => {
      console.log('[websocket-client] connection opened ', event);
    });

    this.socket.addEventListener('message', (event: MessageEvent) => {
      if (typeof event.data !== 'string') {
        throw new Error('unexpected data received');
      }

      const message = event.data;
      const [protocol, data] = extractMessage(message);
      console.log('[websocket-client] message', protocol, data);

      // message just after connection opened
      if (protocol === '0') {
        this.handleOpen(data as ConnectionOpenMessage);
      }
    });

    this.socket.addEventListener('close', (event: CloseEvent) => {
      // maybe closed by server
      console.error('[websocket-client] connection closed ', event);
    });

    this.socket.addEventListener('error', (event: any) => {
      console.error('[websocket-client] connection errored ', event);
    });
  }

  private handleOpen(message: ConnectionOpenMessage) {
    // setup ping
    setInterval(() => {
      this.send('2');
    }, message.pingInterval);

    // consume buffer
    this.sendBuffer.forEach((f) => f());
    this.sendBuffer = [];
  }
}
