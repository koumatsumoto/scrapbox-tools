import {
  CommitErrorResponse,
  CommitResponse,
  JoinRoomErrorResponse,
  JoinRoomResponse,
  WebsocketSendResponse,
} from '../websocket-client-types';

const isCommitErrorResponse = (response: CommitResponse | JoinRoomResponse): response is CommitErrorResponse => {
  return !!response.error && !Array.isArray(response.error.errors);
};

const isJoinRoomErrorResponse = (response: CommitResponse | JoinRoomResponse): response is JoinRoomErrorResponse => {
  return !!response.error && Array.isArray(response.error.errors);
};

export const validateResponse = (response: WebsocketSendResponse) => {
  for (const res of response) {
    if (isCommitErrorResponse(res)) {
      throw new Error(res.error.message);
    } else if (isJoinRoomErrorResponse(res)) {
      throw new Error(JSON.stringify(res.error.errors));
    }
  }
};
