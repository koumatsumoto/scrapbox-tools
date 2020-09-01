import { isBrowser } from '../../../common/env';
import { endpoint, origin } from '../../constants';

export const getScrapboxWebsocketAuthOptions = (token: string) =>
  ({
    headers: {
      Origin: origin,
      Cookie: `connect.sid=${token}`,
    },
  } as const);
type Options = ReturnType<typeof getScrapboxWebsocketAuthOptions>;

export const getDefaultWebsocket = (options: Options) => {
  if (isBrowser) {
    return new WebSocket(endpoint);
  } else {
    // FIXME: bad type annotation
    const NodeWebsocket = require('ws');
    return new NodeWebsocket(endpoint, undefined, options) as InstanceType<typeof WebSocket>;
  }
};

// FIXME: should contain node.js websocket
export type Websocket = ReturnType<typeof getDefaultWebsocket>;
