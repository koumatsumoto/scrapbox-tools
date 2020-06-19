import { ID } from '../../../browser-api';
import { CommitChange } from '../internal/commit-change';

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

export type CommitErrorResponsePayload = {
  error: {
    name: string;
    message: string;
    errors: {
      title?: CommitError;
      titleLc?: CommitError;
    };
  };
};

export type JoinRoomErrorResponsePayload = {
  error: {
    errors: JoinRoomError[];
  };
};

export type ErrorResponsePayload = CommitErrorResponsePayload | JoinRoomErrorResponsePayload;

export type ConnectionOpenResponsePayload = {
  sid: string;
  upgrades: [];
  pingInterval: number;
  pingTimeout: number;
};

export type CommitSuccessResponsePayload = {
  data: { commitId: string };
};

export type CommitResponsePayload = CommitSuccessResponsePayload | ErrorResponsePayload;

export type JoinRoomSuccessResponsePayload = {
  data: {
    success: true;
    pageId: string;
    projectId: string;
  };
};

export type JoinRoomResponsePayload = JoinRoomSuccessResponsePayload | ErrorResponsePayload;

export type DeprecatedWebsocketSendResponsePayload = CommitResponsePayload[] | JoinRoomResponsePayload[];

export type CursorResponsePayload = [
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

export type ExternalCommitResponsePayload = ['commit', ExternalCommitData];

// response for protocol '42'
export type ExternalResponsePayload = CursorResponsePayload | ExternalCommitResponsePayload;

// include response by ping, onopen, updation by other user
export type WebsocketResponsePayload =
  | ConnectionOpenResponsePayload
  | CursorResponsePayload
  | ExternalCommitResponsePayload
  | CommitResponsePayload[]
  | JoinRoomResponsePayload[]
  | undefined;
