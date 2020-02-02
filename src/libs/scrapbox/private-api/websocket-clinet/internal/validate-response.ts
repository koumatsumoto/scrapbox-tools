import { WebsocketSendResponse } from '../websocket-client-types';

export const validateResponse = (response: WebsocketSendResponse) => {
  for (const res of response) {
    if (res.error !== undefined) {
      // error for room-join
      if (res.error.errors) {
        if (Array.isArray(res.error.errors) && res.error.errors[0]) {
          throw new Error(res.error.errors[0].message);
        } else {
          throw new Error('error response for join room (unexpected schema)');
        }
      } else {
        throw new Error(res.error.message);
      }
    }
  }
};
