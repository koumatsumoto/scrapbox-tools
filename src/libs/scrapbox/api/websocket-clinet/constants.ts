export const endpoint = 'wss://scrapbox.io/socket.io/?EIO=3&transport=websocket';
export const headers = {
  initialize: '0',
  ping: '2',
  pong: '3',
  connected: '40',
  // e.g.
  //   * 42: 'cursor'
  //   * 42X: user custom request (X is arbitrary natural number to specify response)
  send: '42',
  // e.g.
  //   * 43X: response to user custom request (X is number used for request)
  receive: '43',
};
export const websocketResponseTimeout = 1000 * 30;
