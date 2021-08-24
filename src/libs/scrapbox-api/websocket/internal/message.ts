import { packetTypes } from '../constants';
import { SendResponse } from './response';
import { isIntegerString } from './util';

export const toSocketIoMessagePayload = (id: string, data: unknown) => {
  return `${packetTypes.send}${id}${JSON.stringify(['socket.io-request', data])}`;
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

export const isResponseOf =
  (expected: string) =>
  ({ sid }: { sid: string }) =>
    expected === sid;

// 430[{...}}] => 430, [{}]
// @see https://github.com/socketio/engine.io-protocol
export const scrapboxDeserializer = (event: { data: any }): ParsedMessage => {
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

export const scrapboxSerializer = (message: unknown): string => {
  return typeof message === 'string' ? message : JSON.stringify(message);
};
