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

export type CommitError = {
  message: string;
  name: string;
  properties: {
    message: string;
    type: 'required';
    path: 'title';
    value: '';
  };
  kind: 'required';
  path: 'title';
  value: '';
  stack: string;
};

export type JoinRoomError = {
  message: string;
  name: string;
  stringValue: string;
  kind: 'ObjectId';
  value: string;
  path: '_id';
  stack: string;
};

export type CommitSuccessResponse = {
  data: { commitId: string };
  error: undefined;
};

export type CommitErrorResponse = {
  data: undefined;
  error: {
    name: string;
    message: string;
    errors: {
      title?: CommitError;
      titleLc?: CommitError;
    };
  };
};

export type CommitResponse = CommitSuccessResponse | CommitErrorResponse;

export type JoinRoomSuccessResponse = {
  data: {
    success: true;
    pageId: string;
    projectId: string;
  };
  error: undefined;
};

export type JoinRoomErrorResponse = {
  data: undefined;
  error: {
    errors: JoinRoomError[];
  };
};

export type JoinRoomResponse = JoinRoomSuccessResponse | JoinRoomErrorResponse;

export type WebsocketSendResponse = CommitResponse[] | JoinRoomResponse[];

export type ExternalCursorResponse = [
  'cursor',
  {
    user: {
      id: string;
      displayName: string;
    };
    pageId: string;
    position: {
      line: number;
      char: number;
    };
    visible: true;
    socketId: string;
  },
];

export type ExternalCommitData = {
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
};

export type ExternalCommitResponse = ['commit', ExternalCommitData];

// response for protocol '42'
export type ExternalResponse = ExternalCursorResponse | ExternalCommitResponse;

// include response by ping, onopen, updation by other user
export type WebsocketResponse = ConnectionOpenResponse | WebsocketSendResponse | ExternalCursorResponse | ExternalCommitResponse | null;

export type ProtocolAndData = ['0', ConnectionOpenResponse] | [Protocol, WebsocketResponse];

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
