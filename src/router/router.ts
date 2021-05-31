import { concat, Observable, of } from 'rxjs';
import { distinctUntilChanged, share } from 'rxjs/operators';
import { getHistoryEventObservable } from './internal/observable';

export class Router {
  private readonly event$: Observable<string> = getHistoryEventObservable().pipe(share());

  get url(): Observable<string> {
    return concat(of(window.location.href), this.event$).pipe(distinctUntilChanged());
  }

  get urlChange(): Observable<string> {
    return this.event$.pipe(distinctUntilChanged());
  }
}
