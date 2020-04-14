import { ScrapboxLayout } from '../../../../types/scrapbox';
import { getRx } from '../../../common/rxjs';
import { getScrapbox } from '../scrapbox';

const checkInterval = 250;

/**
 * Observe window.scrapbox and notify if it changes.
 *
 * TODO: 2020/04/14 integrate into Router
 */
export class ScrapboxObserver {
  readonly layout$ = new (getRx().ReplaySubject)<ScrapboxLayout>(1);
  layout: ScrapboxLayout | undefined; // undefined until first set

  constructor() {
    // initial value setting
    this.updateLayoutIfNeeded(getScrapbox().Layout);

    // register interval check
    this.observeChange();
  }

  private updateLayoutIfNeeded(newValue: ScrapboxLayout) {
    if (newValue && this.layout !== newValue) {
      this.layout = newValue;
      this.layout$.next(newValue);
    }
  }

  private observeChange() {
    let prevLayout = getScrapbox().Layout;

    window.setInterval(() => {
      const currLayout = getScrapbox().Layout;
      if (currLayout !== prevLayout) {
        prevLayout = currLayout;
        this.layout$.next(prevLayout);
      }
    }, checkInterval);
  }
}

/**
 * cannot instantiate until RxJS imported.
 * call this after preparation.
 */
let scrapboxObserver: ScrapboxObserver;
export const getScrapboxObserver = () => {
  if (scrapboxObserver) {
    return scrapboxObserver;
  }

  scrapboxObserver = new ScrapboxObserver();

  return scrapboxObserver;
};
