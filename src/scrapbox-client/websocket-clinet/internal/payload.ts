import { ID } from '../../common';
import { ChangeRequestCreateParams, createChangeRequests, CommitChangeRequest } from './request';

export const createCommitPayload = (params: { projectId: string; userId: string; pageId: string; parentId: string; changes: ChangeRequestCreateParams[] }) => {
  return {
    method: 'commit',
    data: {
      kind: 'page',
      userId: params.userId,
      projectId: params.projectId,
      pageId: params.pageId,
      parentId: params.parentId,
      changes: createChangeRequests(params.changes, params.userId),
      cursor: null,
      freeze: true,
    },
  } as const;
};

export const createJoinPayload = (params: { projectId: string; pageId: string }) => {
  return {
    method: 'room:join',
    data: {
      pageId: params.pageId,
      projectId: params.projectId,
      projectUpdatesStream: false,
    },
  } as const;
};

export type RequestPayload = ReturnType<typeof createCommitPayload> | ReturnType<typeof createJoinPayload>;

type Error = {
  message: string;
  name: string;
  value: string;
  kind: 'required' | 'ObjectId' | string;
  path: '_id' | 'title' | string;
  stack: string;
};

export type CommitError = Error & {
  properties: {
    message: string;
    type: 'required';
    path: 'title';
    value: '';
  };
};

export type JoinError = Error & {
  stringValue: string;
};

export type CommitErrorPayload = {
  error: {
    name: string;
    message: string;
    errors: {
      title?: CommitError;
      titleLc?: CommitError;
    };
  };
};

export type JoinErrorPayload = {
  error: {
    errors: JoinError[];
  };
};

export type ErrorResponsePayload = CommitErrorPayload | JoinErrorPayload;

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

export type SendResponsePayload = CommitResponsePayload[] | JoinRoomResponsePayload[];

export type CursorResponsePayload = [
  'cursor',
  {
    user: { id: string; displayName: string };
    pageId: string;
    position: { line: number; char: number };
    visible: true;
    socketId: string;
  },
];

export type ExternalCommitData = {
  kind: 'page';
  parentId: string;
  changes: CommitChangeRequest[];
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
export type WebsocketResponsePayload = ConnectionOpenResponsePayload | CursorResponsePayload | ExternalCommitResponsePayload | SendResponsePayload;
