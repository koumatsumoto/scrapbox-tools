import { Observable, timer } from 'rxjs';
import { share } from 'rxjs/operators';
import { Scrapbox } from '../types';

export const findElementOrFail = <T extends Element>(selector: string, parent: ParentNode = document) => {
  const elem = parent.querySelector<T>(selector);
  if (!elem) {
    throw new Error('Element not found');
  }

  return elem;
};

export const nodeChange = <N extends Node>(node: N, options: MutationObserverInit) => {
  return new Observable<N>((subscriber) => {
    const mo = new MutationObserver(() => subscriber.next());
    mo.observe(node, options);

    return () => mo.disconnect();
  }).pipe(share());
};

// NOTE: scrapbox.Project.name is set after react bootstrapped
export const isScrapboxReady = () => Boolean(window.scrapbox.Project && window.scrapbox.Project.name);

export const scrapboxReady = () => {
  return new Observable<Scrapbox>((subscriber) => {
    const subscription = timer(0, 30).subscribe(() => {
      if (isScrapboxReady()) {
        subscriber.next(window.scrapbox);
        subscriber.complete();
        subscription.unsubscribe();
      }
    });

    return subscription;
  });
};
