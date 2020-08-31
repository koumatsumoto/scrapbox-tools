import { headers } from '../../constants';
import { WebsocketRequestPayload } from '../../types';

export const createMessage = (id: string, payload: WebsocketRequestPayload) => {
  const body = JSON.stringify(['socket.io-request', payload]);

  return [id, `${headers.send}${id}${body}`] as const;
};
