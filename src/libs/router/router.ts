import { concat, Observable, of } from 'rxjs';
import { distinctUntilChanged, share } from 'rxjs/operators';
import { documentReady, historyState } from './internal';

export class Router {
  private readonly event$: Observable<string> = historyState().pipe(share());

  get url(): Observable<string> {
    return concat(of(window.location.href), this.event$).pipe(distinctUntilChanged());
  }

  get urlChange(): Observable<string> {
    return this.event$.pipe(distinctUntilChanged());
  }

  get documentReady(): Observable<void> {
    return documentReady();
  }
}
