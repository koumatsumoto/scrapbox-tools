import { Websocket } from './getter';

export const isOpen = (socket: Websocket) => socket.readyState === socket.OPEN;
