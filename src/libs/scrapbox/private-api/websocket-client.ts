import { createJoinRoomMessage, extractMessage } from './websocket-client-internal-functions';

const endpoint = 'wss://scrapbox.io/socket.io/?EIO=3&transport=websocket';

export class WebsocketClient {
  private readonly socket: WebSocket;

  constructor(private readonly option: { projectId: string }) {
    this.socket = new WebSocket(endpoint);
    this.initialize();
  }

  sendCommit(message: string) {
    this.send(message);
  }

  private sendJoinRoom() {
    this.send(createJoinRoomMessage({ projectId: this.option.projectId }));
  }

  private send(message: string) {
    // TODO: validate connection status, this.socket.OPEN

    this.socket.send(message);
  }

  /**
   * Connect to websocket and register events.
   */
  private initialize() {
    this.socket.addEventListener('open', (event: Event) => {
      console.log('[websocket-client] connection opened ', event);
      this.sendJoinRoom();
    });

    this.socket.addEventListener('message', (event: MessageEvent) => {
      if (typeof event.data !== 'string') {
        throw new Error('unexpected data received');
      }

      console.log('[debug] ws message', event.data);
      const message = event.data;
      const [protocol, data] = extractMessage(message);
      console.log('[debug] extracted', data);
    });

    this.socket.addEventListener('close', (event: CloseEvent) => {
      // maybe closed by server
      console.error('[websocket-client] connection closed ', event);
    });

    this.socket.addEventListener('error', (event: any) => {
      console.error('[websocket-client] connection errored ', event);
    });
  }
}
