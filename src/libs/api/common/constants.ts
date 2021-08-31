export const constants = {
  rest: {
    baseUrl: 'https://scrapbox.io/api',
  },
  websocket: {
    endpoint: 'wss://scrapbox.io/socket.io/?EIO=4&transport=websocket',
    origin: 'https://scrapbox.io',
    responseTimeout: 1000 * 15,
    packetTypes: {
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
      response: '43',
    },
  },
};
