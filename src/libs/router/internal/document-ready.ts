import { Observable } from 'rxjs';

export const documentReady = () => {
  return new Observable<void>((subscriber) => {
    if (window.document.readyState === 'complete' || window.document.readyState === 'interactive') {
      subscriber.next();
      subscriber.complete();
      return;
    }

    window.document.addEventListener(
      'DOMContentLoaded',
      () => {
        subscriber.next();
        subscriber.complete();
      },
      { once: true },
    );
  });
};
