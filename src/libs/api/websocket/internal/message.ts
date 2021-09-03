import { constants } from '../../common';
import { SendResponse } from './response';
import { isIntegerString } from './utils';

export type DeserializedMessage = [PacketType: string, Data: unknown];
export type SendParam = string | [RequestId: string, Data: string];

export type InitializedMessage = [
  PacketType: typeof constants.websocket.packetTypes.initialize,
  Data: {
    sid: string;
    upgrades: [];
    pingInterval: number;
    pingTimeout: number;
  },
];
export type ResponseMessage = [PacketType: `43${string}`, Data: SendResponse];

export const isConnectionMessage = (message: DeserializedMessage): message is InitializedMessage => {
  return message[0] === constants.websocket.packetTypes.initialize;
};

export const isResponseMessage = (message: DeserializedMessage): message is ResponseMessage => {
  return message[0].length > 2 && message[0].startsWith(constants.websocket.packetTypes.response);
};

export const getRequestId = (packetType: string) => packetType.slice(2);
export const isResponseMessageOf = (sid: string) => (message: DeserializedMessage) => {
  return isResponseMessage(message) && sid === getRequestId(message[0]);
};

export const isResponseOf = (expected: string) => {
  return ([sid]: DeserializedMessage) => expected === sid;
};

// 430[{...}}] => 430, [{}]
// @see https://github.com/socketio/engine.io-protocol
export const socketIoMessageDeserializer = (event: { data: any }): DeserializedMessage => {
  let packetType = '';
  let message = String(event.data);

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

export const socketIoMessageSerializer = (data: SendParam): string => {
  return !Array.isArray(data) ? String(data) : `${constants.websocket.packetTypes.send}${data[0]}${JSON.stringify(['socket.io-request', data[1]])}`;
};
