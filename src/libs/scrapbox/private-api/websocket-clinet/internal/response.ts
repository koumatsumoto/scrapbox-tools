import {
  CommitErrorResponsePayload,
  CommitResponsePayload,
  CommitSuccessResponsePayload,
  ConnectionOpenResponsePayload,
  CursorResponsePayload,
  ExternalCommitResponsePayload,
  JoinRoomResponsePayload,
  JoinRoomSuccessResponsePayload,
  WebsocketResponsePayload,
} from '../types';

export const isConnectionOpenResponsePayload = (v: WebsocketResponsePayload): v is ConnectionOpenResponsePayload => {
  if (!Array.isArray(v) && v != null) {
    // simple check
    return v.pingInterval !== undefined;
  }

  return false;
};

export const isCommitSuccessResponsePayload = (v: CommitResponsePayload | JoinRoomResponsePayload): v is CommitSuccessResponsePayload => {
  return 'data' in v && 'commitId' in v.data;
};

export const isErrorResponsePayload = (v: CommitResponsePayload | JoinRoomResponsePayload): v is CommitErrorResponsePayload => {
  return 'error' in v && v.error !== undefined;
};

export const isJoinRoomSuccessResponsePayload = (
  v: CommitResponsePayload | JoinRoomResponsePayload,
): v is JoinRoomSuccessResponsePayload => {
  return 'data' in v && !('commitId' in v.data);
};

export const isCursorResponsePayload = (v: WebsocketResponsePayload): v is CursorResponsePayload => {
  if (Array.isArray(v)) {
    return v[0] === 'cursor';
  }

  return false;
};

export const isExternalCommitResponsePayload = (v: WebsocketResponsePayload): v is ExternalCommitResponsePayload => {
  if (Array.isArray(v)) {
    return v[0] === 'commit';
  }

  return false;
};

export const isCommitResponsePayload = (v: WebsocketResponsePayload): v is CommitResponsePayload[] => {
  if (Array.isArray(v)) {
    const head = v[0];
    if (head && typeof head !== 'string') {
      return isCommitSuccessResponsePayload(head) || isErrorResponsePayload(head);
    }
  }

  return false;
};

export const isJoinRoomResponsePayload = (v: WebsocketResponsePayload): v is CommitResponsePayload[] => {
  if (Array.isArray(v)) {
    const head = v[0];
    if (head && typeof head !== 'string') {
      return isJoinRoomSuccessResponsePayload(head) || isErrorResponsePayload(head);
    }
  }

  return false;
};
