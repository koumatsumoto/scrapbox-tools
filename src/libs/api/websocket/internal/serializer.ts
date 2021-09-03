import { Message, packetTypes } from './message';

export type RequestParam = string | number | [RequestId: string | number, Data: string];

export const socketIoMessageSerializer = (param: RequestParam): string => {
  return !Array.isArray(param) ? String(param) : `${packetTypes.updateMessage}${param[0]}${JSON.stringify(['socket.io-request', param[1]])}`;
};

const socketIoMessageRegexp = /^(\d+)(\D?.*)$/;
export const socketIoMessageDeserializer = (event: { data: unknown }): Message => {
  const [, packetType, data] = String(event.data).match(socketIoMessageRegexp) ?? [];

  return { packetType, data: data ? JSON.parse(data) : undefined };
};
