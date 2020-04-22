import { WebsocketResponsePayload } from '../types';

// 430[{...}}] => 430, [{}]
export const parseMessage = (message: string): [string, WebsocketResponsePayload] => {
  // protocol and arbitrary number
  let header = '';
  while (message.length) {
    const head = message[0];
    // remove head if it is numeric char (part of protocol)
    if (Number.isInteger(Number.parseInt(head))) {
      header += head;
      message = message.substr(1);
    } else {
      return [header, JSON.parse(message) as WebsocketResponsePayload];
    }
  }

  return [header, undefined];
};
