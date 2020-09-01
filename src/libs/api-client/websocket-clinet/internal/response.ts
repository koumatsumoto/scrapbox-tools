import { firstValueFrom, Observable } from 'rxjs';
import { filter, first, map, timeout } from 'rxjs/operators';
import { socketIoHeaders, websocketResponseTimeout } from '../constants';
import { parseMessage } from './message';
import { ConnectionOpenResponsePayload, SendResponsePayload, WebsocketResponsePayload } from './payload';
import { getWebsocketEventStreams } from './websocket/event-stream';
import { Websocket } from './websocket/getter';

const responseTypes = {
  error: 'error',
  initialize: 'initialize',
  response: 'response',
  others: 'others',
} as const;

const toResponse = (event: { data: unknown }) => {
  if (typeof event.data !== 'string') {
    return {
      type: responseTypes.error,
      data: String(event.data),
    } as const;
  }

  const [header, data] = parseMessage(event.data);
  switch (header) {
    // just after connection opened
    case socketIoHeaders.initialize: {
      return {
        type: responseTypes.initialize,
        data: data as ConnectionOpenResponsePayload,
      } as const;
    }
    default: {
      // result of this.send()
      if (header.startsWith(socketIoHeaders.receive)) {
        return {
          type: responseTypes.response,
          sid: header.slice(socketIoHeaders.receive.length),
          data: data as SendResponsePayload,
        } as const;
      }

      return {
        type: responseTypes.others,
        data: data as WebsocketResponsePayload,
      } as const;
    }
  }
};

type Response = ReturnType<typeof toResponse>;
const isError = (data: Response): data is Extract<Response, { type: typeof responseTypes.error }> => data.type === responseTypes.error;
const isInitialize = (data: Response): data is Extract<Response, { type: typeof responseTypes.initialize }> => data.type === responseTypes.initialize;
const isResponse = (data: Response): data is Extract<Response, { type: typeof responseTypes.response }> => data.type === responseTypes.response;
const isOthers = (data: Response): data is Extract<Response, { type: typeof responseTypes.others }> => data.type === responseTypes.others;

export const getScrapboxWebsocketResponseStreams = (socket: Websocket) => {
  const { open, close, error, message } = getWebsocketEventStreams(socket);
  const response = message.pipe(map(toResponse));

  return {
    open,
    close,
    error,
    message,
    initialize: response.pipe(filter(isInitialize)),
    response: response.pipe(filter(isResponse)),
    others: response.pipe(filter(isOthers)),
    errorResponse: response.pipe(filter(isError)),
  } as const;
};

export const retrieveResponse = (response$: Observable<{ sid: string; data: SendResponsePayload }>, sid: string, timeoutMs = websocketResponseTimeout) => {
  return firstValueFrom(
    response$.pipe(
      timeout(timeoutMs),
      first((response) => response.sid === sid),
      map((response) => response.data),
    ),
  );
};
