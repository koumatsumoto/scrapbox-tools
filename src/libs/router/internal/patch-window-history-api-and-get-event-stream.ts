import { Subject } from 'rxjs';
import { RouterEvent } from './types';

let originalPushState: typeof window.history.pushState;
let originalReplaceState: typeof window.history.replaceState;

let stream: Subject<RouterEvent>;
const isPatchedOnce = () => stream !== undefined;
const getData = () => ({
  state: window.history.state,
  title: window.document.title,
  url: window.document.documentURI,
});

const extendedPushState = (state: any, title: string, url?: string | null) => {
  // NOTE: use call(window) to avoid `TypeError: Illegal invocation`
  originalPushState.call(window, state, title, url);
  stream.next({ type: 'pushState', data: getData(), debug: { state, title, url } });
};

const extendedReplaceState = (state: any, title: string, url?: string | null) => {
  // NOTE: use call(window) to avoid `TypeError: Illegal invocation`
  originalReplaceState(state, title, url);
  stream.next({ type: 'replaceState', data: getData(), debug: { state, title, url } });
};

export const patchWindowHistoryApiAndGetEventStream = () => {
  if (isPatchedOnce()) {
    return stream;
  }

  stream = new Subject<RouterEvent>();
  originalPushState = window.history.pushState;
  originalReplaceState = window.history.replaceState;

  window.history.pushState = extendedPushState;
  window.history.replaceState = extendedReplaceState;
  window.addEventListener('popstate', (ev) => stream.next({ type: 'popstate', data: getData(), debug: { state: ev.state } }));

  return stream;
};
