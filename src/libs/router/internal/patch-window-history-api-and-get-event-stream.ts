import { Subject } from 'rxjs';
import { RouterEvent } from '../types';

let rawPushState: typeof window.history.pushState;
let rawReplaceState: typeof window.history.replaceState;

let stream: Subject<RouterEvent>;
const isPatchedOnce = () => stream !== undefined;
const getData = () => ({
  state: window.history.state,
  title: window.document.title,
  url: window.document.documentURI,
});

export const patchWindowHistoryApiAndGetEventStream = (target = window) => {
  if (isPatchedOnce()) {
    return stream;
  }

  stream = new Subject<RouterEvent>();
  rawPushState = target.history.pushState;
  rawReplaceState = target.history.replaceState;

  target.history.pushState = (state: any, title: string, url?: string | null) => {
    rawPushState(state, title, url);
    stream.next({ type: 'pushState', data: getData(), debug: { state, title, url } });
  };
  target.history.replaceState = (state: any, title: string, url?: string | null) => {
    rawReplaceState(state, title, url);
    stream.next({ type: 'replaceState', data: getData(), debug: { state, title, url } });
  };
  target.addEventListener('popstate', (ev) => {
    stream.next({ type: 'popstate', data: getData(), debug: { state: ev.state } });
  });

  return stream;
};
