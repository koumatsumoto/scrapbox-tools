import { socketIoHeaders } from '../constants';
import { RequestPayload, WebsocketResponsePayload } from './payload';

export const createMessage = (id: string, payload: RequestPayload) => {
  const body = JSON.stringify(['socket.io-request', payload]);

  return [id, `${socketIoHeaders.send}${id}${body}`] as const;
};

// 430[{...}}] => 430, [{}]
export const parseMessage = (message: string) => {
  // protocol and arbitrary number
  let header = '';
  while (message.length) {
    const head = message[0];
    // remove head if it is numeric char (part of protocol)
    if (Number.isInteger(Number.parseInt(head))) {
      header += head;
      message = message.substr(1);
    } else {
      return [header, JSON.parse(message) as WebsocketResponsePayload] as const;
    }
  }

  throw new Error('body is empty');
};
