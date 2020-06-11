import * as NodeWebSocket from 'ws';

type BrowserWebsocketConstructor = typeof WebSocket;
type NodeWebsocketConstructor = {
  new (url: string): NodeWebSocket;
};
export type IsomorphicWebsocket = WebSocket | NodeWebSocket;
export type WebsocketConstructor = BrowserWebsocketConstructor | NodeWebsocketConstructor;

export const getIsomorphicWebsocketConstructor = (): WebsocketConstructor => {
  return typeof window.WebSocket === 'function' ? window.WebSocket : require('ws');
};

/* eslint-disable @typescript-eslint/ban-ts-ignore */
export const registerIsomorphicEventHandling = (
  socket: WebSocket | NodeWebSocket,
  handlers: {
    onErrorOrClose: () => void;
    onMessage: (ev: { data: unknown }) => void;
  },
) => {
  // eslint-disable-next-line
  const onOpen = () => {};
  const onError = () => socket.close();
  const onMessage = (ev: { data: unknown }) => handlers.onMessage(ev);
  const onClose = () => {
    // @ts-ignore
    socket.removeEventListener('open', onOpen);
    // @ts-ignore
    socket.removeEventListener('message', onMessage);
    // @ts-ignore
    socket.removeEventListener('error', onError);
    // @ts-ignore
    socket.removeEventListener('close', onClose);
    handlers.onErrorOrClose();
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
/* eslint-disable @typescript-eslint/ban-ts-ignore */
