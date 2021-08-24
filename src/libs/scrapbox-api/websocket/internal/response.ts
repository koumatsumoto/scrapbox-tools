import { ID } from '../../common';
import { CommitChange } from './request';

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

export type CommitErrorResponse = {
  error: {
    name: string;
    message: string;
    errors: {
      title?: CommitError;
      titleLc?: CommitError;
    };
  };
};

export type JoinErrorResponse = {
  error: {
    errors: JoinError[];
  };
};

export type ErrorResponse = CommitErrorResponse | JoinErrorResponse;

export type CommitSuccessResponse = {
  data: { commitId: string };
};

export type CommitResponse = CommitSuccessResponse | ErrorResponse;

export type JoinRoomSuccessResponse = {
  data: {
    success: true;
    pageId: string;
    projectId: string;
  };
};

export type JoinRoomResponse = JoinRoomSuccessResponse | ErrorResponse;

export type SendResponse = CommitResponse[] | JoinRoomResponse[];

export type CursorResponse = [
  'cursor',
  {
    user: { id: string; displayName: string };
    pageId: string;
    position: { line: number; char: number };
    visible: true;
    socketId: string;
  },
];

export type ExternalCommit = {
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

export type ExternalCommitResponse = ['commit', ExternalCommit];
