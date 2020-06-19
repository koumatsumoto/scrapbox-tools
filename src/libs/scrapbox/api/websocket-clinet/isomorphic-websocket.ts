/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as NodeWebSocket from 'ws';

export type IsomorphicWebsocket = WebSocket | NodeWebSocket;

export const registerIsomorphicWebsocketEventHandling = (
  socket: WebSocket | NodeWebSocket,
  handlers: Partial<{
    onOpen: () => void;
    onErrorOrClose: () => void;
    onMessage: (ev: { data: unknown }) => void;
  }> = {},
) => {
  // eslint-disable-next-line
  const onOpen = () => {};
  const onError = () => socket.close();
  const onMessage = (ev: { data: unknown }) => handlers.onMessage && handlers.onMessage(ev);
  const onClose = () => {
    // @ts-ignore
    socket.removeEventListener('open', onOpen);
    // @ts-ignore
    socket.removeEventListener('message', onMessage);
    // @ts-ignore
    socket.removeEventListener('error', onError);
    // @ts-ignore
    socket.removeEventListener('close', onClose);
    handlers.onErrorOrClose && handlers.onErrorOrClose();
  };

  // @ts-ignore
  socket.addEventListener('open', onOpen);
  // @ts-ignore
  socket.addEventListener('message', onMessage);
  // @ts-ignore
  socket.addEventListener('error', onError);
  // @ts-ignore
  socket.addEventListener('close', onClose);
};
