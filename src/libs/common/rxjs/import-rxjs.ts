/**
 * window.rxjs is loaded by external script
 **/
import * as RxType from 'rxjs';
import * as operatorsType from 'rxjs/operators';
import { loadScript } from '../load-scripts/load-scripts';

export const importRxJS = () =>
  new Promise<RxJS>((resolve, reject) => {
    if (window.rxjs) {
      resolve(window.rxjs);
    }

    loadScript('https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.0.0-alpha.0/rxjs.umd.min.js')
      .then(() => resolve(window.rxjs))
      .catch(reject);
  });

type RxJS = {
  Observable: typeof RxType.Observable;
  Subject: typeof RxType.Subject;
  animationFrameScheduler: typeof RxType.animationFrameScheduler;
  combineLatest: typeof RxType.combineLatest;
  operators: {
    bufferCount: typeof operatorsType.bufferCount;
    debounceTime: typeof operatorsType.debounceTime;
    distinctUntilChanged: typeof operatorsType.distinctUntilChanged;
    filter: typeof operatorsType.filter;
    map: typeof operatorsType.map;
    pairwise: typeof operatorsType.pairwise;
    scan: typeof operatorsType.scan;
    skip: typeof operatorsType.skip;
    withLatestFrom: typeof operatorsType.withLatestFrom;
  };
};

declare global {
  interface Window {
    rxjs: RxJS;
  }
}

// lazy load
export const getRx = () => window.rxjs as RxJS;
