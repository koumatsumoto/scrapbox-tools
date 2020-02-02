import { Subject } from 'rxjs';
import { getRx } from '../../../common';
import { ID } from '../../public-api';
import { CommitChangeParam, createChanges } from './internal/commit-change-param';
import { validateResponse } from './internal/validate-response';
import { extractMessage } from './websocket-client-internal-functions';
import {
  CommitPayload,
  CommitResponse,
  CommitSuccessResponse,
  ConnectionOpenResponse,
  JoinRoomPayload,
  JoinRoomSuccessResponse,
  WebsocketPayload,
  WebsocketSendResponse,
} from './websocket-client-types';

const endpoint = 'wss://scrapbox.io/socket.io/?EIO=3&transport=websocket';
const sendProtocol = '42';
const receiveProtocol = '43';
// own impl
type ResponseEmission = { senderId: string; data: WebsocketSendResponse };

export class WebsocketClient {
  private readonly socket: WebSocket;
  // need buffer if try to send until connection opened
  private sendBuffer: Function[] = [];
  private senderId = 0;
  readonly response$: Subject<ResponseEmission>;
  readonly open$: Subject<Event>;
  readonly close$: Subject<CloseEvent>;
  readonly error$: Subject<Event>;

  constructor(private readonly userId: ID) {
    const { Subject } = getRx();
    this.socket = new WebSocket(endpoint);
    this.response$ = new Subject<ResponseEmission>();
    this.open$ = new Subject<Event>();
    this.close$ = new Subject<CloseEvent>();
    this.error$ = new Subject<Event>();

    this.initialize();
  }

  commit(param: { projectId: string; userId: ID; pageId: string; parentId: string; changes: CommitChangeParam[] }) {
    return this.send({
      method: 'commit',
      data: {
        kind: 'page',
        userId: this.userId,
        projectId: param.projectId,
        pageId: param.pageId,
        parentId: param.parentId,
        changes: createChanges(param.changes),
        cursor: null,
        freeze: true,
      },
    });
  }

  joinRoom(param: { projectId: string; pageId: string | null }) {
    return this.send({
      method: 'room:join',
      data: {
        pageId: param.pageId,
        projectId: param.projectId,
        projectUpdatesStream: false,
      },
    });
  }

  private async send(payload: CommitPayload): Promise<CommitSuccessResponse>;
  private async send(payload: JoinRoomPayload): Promise<JoinRoomSuccessResponse>;
  private async send(payload: WebsocketPayload): Promise<any> {
    const body = JSON.stringify(['socket.io-request', payload]);
    const sid = `${this.senderId++}`;
    const data = `${sendProtocol}${sid}${body}`;

    if (this.socket.readyState !== WebSocket.OPEN) {
      this.sendBuffer.push(() => this.socket.send(data));
    } else {
      this.socket.send(data);
    }

    const response = await this.response$
      .pipe(
        getRx().operators.first(({ senderId }) => senderId === sid),
        getRx().operators.map((res) => res.data),
      )
      .toPromise<WebsocketSendResponse>();
    // throw if error
    validateResponse(response);

    return response;
  }

  /**
   * Connect to websocket and register events.
   */
  private initialize() {
    this.socket.addEventListener('open', (event: Event) => {
      console.log('[websocket-client] connection opened ', event);
      this.open$.next(event);
    });

    this.socket.addEventListener('message', (event: MessageEvent) => {
      if (typeof event.data !== 'string') {
        throw new Error('unexpected data received');
      }

      const message = event.data;
      const [header, data] = extractMessage(message);

      // message just after connection opened
      if (header === '0') {
        this.setPingAndConsumeBuffer(data as ConnectionOpenResponse);
      }
      // for send()
      if (header.startsWith(receiveProtocol)) {
        const senderId = header.slice(receiveProtocol.length);
        this.response$.next({ senderId, data: data as CommitResponse });
      }
    });

    this.socket.addEventListener('close', (event: CloseEvent) => {
      // maybe closed by server
      console.error('[websocket-client] connection closed ', event);
      this.close$.next(event);
    });

    this.socket.addEventListener('error', (event: Event) => {
      console.error('[websocket-client] connection errored ', event);
      this.error$.next(event);
    });
  }

  private setPingAndConsumeBuffer(data: ConnectionOpenResponse) {
    // setup ping
    setInterval(() => {
      this.socket.send('2');
    }, data.pingInterval);

    // consume buffer
    this.sendBuffer.forEach((f) => f());
    this.sendBuffer = [];
  }
}
