import { Subject } from 'rxjs';
import { RouterEvent } from './types';

let rawPushState: typeof window.history.pushState;
let rawReplaceState: typeof window.history.replaceState;

let stream: Subject<RouterEvent>;
const isPatchedOnce = () => stream !== undefined;
const getData = () => ({
  state: window.history.state,
  title: window.document.title,
  url: window.document.documentURI,
});

function customPushState(state: any, title: string, url?: string | null) {
  rawPushState(state, title, url);
  stream.next({ type: 'pushState', data: getData(), debug: { state, title, url } });
}

function customReplaceState(state: any, title: string, url?: string | null) {
  rawReplaceState(state, title, url);
  stream.next({ type: 'replaceState', data: getData(), debug: { state, title, url } });
}

export function patchWindowHistoryApiAndGetEventStream() {
  if (isPatchedOnce()) {
    return stream;
  }

  stream = new Subject<RouterEvent>();
  rawPushState = window.history.pushState;
  rawReplaceState = window.history.replaceState;

  window.history.pushState = customPushState.bind(window);
  window.history.replaceState = customReplaceState.bind(window);
  window.addEventListener('popstate', (ev) => stream.next({ type: 'popstate', data: getData(), debug: { state: ev.state } }));

  return stream;
}
