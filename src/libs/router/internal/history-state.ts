import { Observable } from 'rxjs';

export const historyState = (w = window) => {
  return new Observable<string>((subscriber) => {
    const originPushState = w.history.pushState;
    const originReplaceState = w.history.replaceState;

    const patchedPushState = (state: any, title: string, url?: string | null) => {
      // NOTE: to avoid `TypeError: Illegal invocation`
      originPushState.call(w.history, state, title, url);
      subscriber.next(w.location.href);
    };
    const patchedReplaceState = (state: any, title: string, url?: string | null) => {
      // NOTE: to avoid `TypeError: Illegal invocation`
      originReplaceState.call(w.history, state, title, url);
      subscriber.next(w.location.href);
    };
    const onPopstate = () => subscriber.next(w.location.href);

    w.history.pushState = patchedPushState.bind(w.history);
    w.history.replaceState = patchedReplaceState.bind(w.history);
    w.addEventListener('popstate', onPopstate);

    return () => {
      w.history.pushState = originPushState;
      w.history.replaceState = originReplaceState;
      w.removeEventListener('popstate', onPopstate);
    };
  });
};
