import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { patchWindowHistoryApiAndGetEventStream } from './internal/patch-window-history-api-and-get-event-stream';
import { isSameUrl } from './internal/predicate';
import { RouterEvent } from './internal/types';

export class Router {
  private readonly stream = patchWindowHistoryApiAndGetEventStream();

  constructor(private readonly options: { debug?: true } = {}) {
    if (options.debug) {
      this.enableDebugLog();
    }
  }

  get events(): Observable<RouterEvent> {
    return this.stream.asObservable();
  }

  get urlChange(): Observable<RouterEvent> {
    return this.stream.asObservable().pipe(distinctUntilChanged(isSameUrl));
  }

  private enableDebugLog() {
    this.events.subscribe((ev) => console.log('[st/router] events: ', ev));
    this.urlChange.subscribe((ev) => console.log('[st/router] urlChange: ', ev));
  }
}
