// general event names of websocket for both browser and node.js
import { fromEvent } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { Websocket } from './getter';

export const websocketEventNames = {
  open: 'open',
  message: 'message',
  error: 'error',
  close: 'close',
} as const;

export const getWebsocketEventStreams = (socket: Websocket) => {
  const close = fromEvent(socket, websocketEventNames.close).pipe(first());
  const open = fromEvent(socket, websocketEventNames.open).pipe(first(), takeUntil(close));
  const error = fromEvent(socket, websocketEventNames.error).pipe(first(), takeUntil(close));
  const message = fromEvent<{ data: unknown }>(socket, websocketEventNames.message).pipe(takeUntil(close));

  return {
    open,
    close,
    error,
    message,
  } as const;
};
