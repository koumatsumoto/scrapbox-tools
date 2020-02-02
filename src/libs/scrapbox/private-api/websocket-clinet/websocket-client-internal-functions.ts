import { Protocol, ProtocolAndPayload, WebsocketResponse } from './websocket-client-types';

// 430[{...}}] => 430, [{}]
export const extractMessage = (message: string): ProtocolAndPayload => {
  // protocol and arbitrary number
  let header = '';
  while (message.length) {
    const head = message[0];
    // remove head if it is numeric char (part of protocol)
    if (Number.isInteger(Number.parseInt(head))) {
      header += head;
      message = message.substr(1);
    } else {
      return [header as Protocol, JSON.parse(message) as WebsocketResponse];
    }
  }

  return [header as Protocol, null];
};
