// only actually used values
import { ID } from '../../public-api';
import { CommitChange } from './internal/commit-change';

/**
 * - '0'
 * - '2'
 * - '3'
 * - '40'
 * - '42x'
 */
export type Protocol = '0' | '2' | '3' | '40' | '42' | string;

export type ConnectionOpenResponse = {
  sid: string;
  upgrades: [];
  pingInterval: number;
  pingTimeout: number;
};

export type CommitSuccessResponse = [
  {
    data: { commitId: string };
    error: undefined;
  },
];
export type CommitErrorResponse = [
  {
    data: undefined;
    error: {
      name: string;
      message: string;
      // for type checking
      errors: undefined;
    };
  },
];

export type CommitResponse = CommitSuccessResponse | CommitErrorResponse;

export type JoinRoomSuccessResponse = [
  {
    data: {
      success: true;
      pageId: string;
      projectId: string;
    };
    error: undefined;
  },
];

export type JoinRoomErrorResponse = [
  {
    data: undefined;
    error: {
      errors: [
        {
          message: string;
          name: string;
          stringValue: string;
          kind: 'ObjectId';
          value: string;
          path: '_id';
          stack: string;
        },
      ];
    };
  },
];

export type JoinRoomResponse = JoinRoomSuccessResponse | JoinRoomErrorResponse;

export type WebsocketSendResponse = CommitResponse | JoinRoomResponse;

// ping, onopen
export type WebsocketResponse = ConnectionOpenResponse | WebsocketSendResponse | null;

export type ProtocolAndPayload = ['0', ConnectionOpenResponse] | [Protocol, WebsocketResponse];

export type CommitPayload = {
  method: 'commit';
  data: {
    kind: 'page';
    // last committed id
    parentId: string;
    changes: CommitChange[];
    cursor: null;
    pageId: string;
    userId: ID;
    projectId: string;
    freeze: true;
  };
};

export type JoinRoomPayload = {
  method: 'room:join';
  data: {
    projectId: string;
    pageId: string | null;
    projectUpdatesStream: false;
  };
};

export type WebsocketPayload = CommitPayload | JoinRoomPayload;
