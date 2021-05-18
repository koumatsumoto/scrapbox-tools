import { packetTypes } from '../constants';
import { SendResponse } from './response';
import { isIntegerString } from './util';

export const toSocketIoPayload = (id: string, data: unknown) => {
  return `${packetTypes.send}${id}${JSON.stringify(JSON.stringify(['socket.io-request', data]))}`;
};

export type ParsedMessage = [PacketType: string, Data: unknown];
export type InitializedMessage = [
  PacketType: typeof packetTypes.initialize,
  Data: {
    sid: string;
    upgrades: [];
    pingInterval: number;
    pingTimeout: number;
  },
];
export type ResponseMessage = [PacketType: `43${string}`, Data: SendResponse];

// 430[{...}}] => 430, [{}]
// @see https://github.com/socketio/engine.io-protocol
export const parseMessage = (message: string): ParsedMessage => {
  let packetType = '';
  while (message.length) {
    const head = message[0];
    if (isIntegerString(head)) {
      packetType += head;
      message = message.substr(1);
    } else {
      return [packetType, JSON.parse(message)];
    }
  }

  return [packetType, undefined];
};

export const isConnectionMessage = (message: ParsedMessage): message is InitializedMessage => {
  return message[0] === packetTypes.initialize;
};

export const isResponseMessage = (message: ParsedMessage): message is ResponseMessage => {
  return message[0].length > 2 && message[0].startsWith(packetTypes.response);
};

export const getRequestId = (packetType: string) => packetType.slice(2);
export const isResponseMessageOf = (sid: string) => (message: ParsedMessage) => {
  return isResponseMessage(message) && sid === getRequestId(message[0]);
};
