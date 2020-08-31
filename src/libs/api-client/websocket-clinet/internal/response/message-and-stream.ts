// user defined data types
import { firstValueFrom, Observable } from 'rxjs';
import { filter, first, map, timeout } from 'rxjs/operators';
import { headers, websocketResponseTimeout } from '../../constants';
import { ConnectionOpenResponsePayload, SendResponsePayload, WebsocketResponsePayload } from '../../types';
import { getWebsocketEventStreams } from '../websocket/event-stream';
import { Websocket } from '../websocket/getter';

// 430[{...}}] => 430, [{}]
export const parseMessage = (message: string): [string, WebsocketResponsePayload] => {
  // protocol and arbitrary number
  let header = '';
  while (message.length) {
    const head = message[0];
    // remove head if it is numeric char (part of protocol)
    if (Number.isInteger(Number.parseInt(head))) {
      header += head;
      message = message.substr(1);
    } else {
      return [header, JSON.parse(message) as WebsocketResponsePayload];
    }
  }

  throw new Error('body is empty');
};

const responseTypes = {
  error: 'error',
  initialize: 'initialize',
  response: 'response',
  others: 'others',
} as const;

export const handleMessage = (event: { data: unknown }) => {
  if (typeof event.data !== 'string') {
    return {
      type: responseTypes.error,
      data: event.data,
    } as const;
  }

  const [header, data] = parseMessage(event.data);
  switch (header) {
    // just after connection opened
    case headers.initialize: {
      return {
        type: responseTypes.initialize,
        data: data as ConnectionOpenResponsePayload,
      } as const;
    }
    default: {
      // result of this.send()
      if (header.startsWith(headers.receive)) {
        return {
          type: responseTypes.response,
          sid: header.slice(headers.receive.length),
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

type Message = ReturnType<typeof handleMessage>;
const isErrorMessage = (data: Message): data is Extract<Message, { type: typeof responseTypes.error }> => data.type === responseTypes.error;
const isInitializeMessage = (data: Message): data is Extract<Message, { type: typeof responseTypes.initialize }> => data.type === responseTypes.initialize;
const isResponseMessage = (data: Message): data is Extract<Message, { type: typeof responseTypes.response }> => data.type === responseTypes.response;
const isOthersMessage = (data: Message): data is Extract<Message, { type: typeof responseTypes.others }> => data.type === responseTypes.others;

export const getScrapboxWebsocketResponseStreams = (socket: Websocket) => {
  const { open, close, error, message } = getWebsocketEventStreams(socket);
  const data = message.pipe(map(handleMessage));

  return {
    open,
    close,
    error,
    message,
    initialize: data.pipe(filter(isInitializeMessage)),
    response: data.pipe(filter(isResponseMessage)),
    others: data.pipe(filter(isOthersMessage)),
    errorResponse: data.pipe(filter(isErrorMessage)),
  } as const;
};

export const waitForResponse = (response$: Observable<{ sid: string; data: SendResponsePayload }>, sid: string, timeoutMs = websocketResponseTimeout) => {
  return firstValueFrom(
    response$.pipe(
      timeout(timeoutMs),
      first((response) => response.sid === sid),
      map((response) => response.data),
    ),
  );
};
