import { ID } from '../../common';
import { CommitChange } from './change';
import { Error } from './error';

export type Message = {
  packetType: string;
  data?: unknown;
};

/**
 * Socket.io packet types
 *
 * e.g.
 *  - onmessage 40{"sid":"mAsOl9ZNGQ8vRWA_AABt"}
 *  - onmessage 42["graceful-shutdown"]
 *
 * @see https://github.com/socketio/engine.io-protocol
 * @see https://github.com/socketio/socket.io-parser/blob/master/lib/index.ts
 */
export const packetTypes = {
  open: '0',
  close: '1',
  ping: '2',
  pong: '3',
  message: '4',
  connectedMessage: '40',
  errorMessage: '41',
  // both send and receive cursor message: 42["cursor",{"user":{"id":"...
  // receive graceful-shutdown message: 40{"sid":"mAsOl9ZNGQ8vRWA_AABt"}
  updateMessage: '42',
  responseMessage: '43',
} as const;

// packet-type 42
export type CursorMessagePayload = [
  'cursor',
  {
    user: { id: string; displayName: string };
    pageId: string;
    position: { line: number; char: number };
    visible: true;
    socketId: string;
  },
];
export type ExternalCommitMessagePayload = [
  'commit',
  {
    kind: 'page';
    parentId: string;
    changes: CommitChange[];
    cursor: null;
    pageId: string;
    userId: ID;
    projectId: string;
    freeze: true;
    // new commit id
    id: string;
  },
];

// packet-type 0
export type InitializedMessage = {
  packetType: typeof packetTypes.open;
  data: {
    sid: string;
    upgrades: [];
    pingInterval: number;
    pingTimeout: number;
  };
};

// packet-type 40
export type ConnectedMessage = {
  packetType: typeof packetTypes.connectedMessage;
  data: {
    sid: string;
  };
};

// packet-type 42x
export type CommitResultMessage = {
  packetType: `${typeof packetTypes.responseMessage}${number}`;
  data: ({ data: { commitId: string } } | { error: Error })[];
};

// packet-type 42x
export type JoinResultMessage = {
  packetType: `${typeof packetTypes.responseMessage}${number}`;
  data: ({ data: { success: true; pageId: string; projectId: string } } | { error: Error })[];
};

export type ResponseMessage = CommitResultMessage | JoinResultMessage;

const getRequestId = (type: string) => type.slice(2);

export const isResponseMessageOf = <M extends ResponseMessage>(id: string | number) => {
  return (message: Message): message is M => {
    return message.packetType.startsWith(packetTypes.responseMessage) && getRequestId(message.packetType) === String(id);
  };
};

export const isInitializedMessage = (message: Message): message is InitializedMessage => {
  return message.packetType === packetTypes.open;
};
export const isConnectedMessage = (message: Message): message is ConnectedMessage => {
  return message.packetType === packetTypes.connectedMessage;
};
