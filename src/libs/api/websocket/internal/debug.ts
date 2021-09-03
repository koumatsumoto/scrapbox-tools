const time = () => new Date().getTime();
export const debugWebsocket = (websocket: WebSocket) => {
  console.log(time(), '[websocket] initialized');

  websocket.addEventListener('open', () => console.log(time(), '[websocket] onopen'));
  websocket.addEventListener('message', (ev) => console.log(time(), '[websocket] onmessage', ev.data));
  websocket.addEventListener('error', (ev) => console.log(time(), '[websocket] onerror'));
  websocket.addEventListener('close', (ev) => console.log(time(), '[websocket] onclose', ev.reason));

  websocket.send = new Proxy(websocket.send, {
    apply: (target, thisArg, args) => {
      console.log(time(), '[websocket] send', args[0]);

      return target.call(websocket, args[0]);
    },
  });
  websocket.close = new Proxy(websocket.close, {
    apply: (target) => {
      console.log(time(), '[websocket] close');

      return target.call(websocket);
    },
  });
};
