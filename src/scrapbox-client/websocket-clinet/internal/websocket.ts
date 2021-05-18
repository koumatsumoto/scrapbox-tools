import { fromEvent } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { isBrowser } from '../../common/env';

export const getBrowserWebSocket = ({ endpoint }: { endpoint: string }) => new WebSocket(endpoint);
export const getNodeJSWebSocket = ({ endpoint, origin, cookie }: { endpoint: string; origin: string; cookie: string }) => {
  const NodeWebsocket = require('ws');
  const headers = { Origin: origin, Cookie: cookie };

  return new NodeWebsocket(endpoint, undefined, { headers }) as InstanceType<typeof WebSocket>;
};

export const getWebSocket = (settings: { endpoint: string; origin: string; cookie: string }) => {
  if (isBrowser()) {
    // @TODO: validate settings
    return getBrowserWebSocket(settings);
  } else {
    // @TODO: validate settings
    return getNodeJSWebSocket(settings);
  }
};

export const getEventStream = (socket: WebSocket) => {
  const close = fromEvent<CloseEvent>(socket, 'close').pipe(first());
  const open = fromEvent<Event>(socket, 'open').pipe(takeUntil(close), first());
  const error = fromEvent<Event>(socket, 'error').pipe(takeUntil(close), first());
  const message = fromEvent<MessageEvent>(socket, 'message').pipe(takeUntil(close));

  return { open, close, error, message };
};
