/**
 * window.rxjs is loaded by external script
 **/
import * as RxType from 'rxjs';
import * as operatorsType from 'rxjs/operators';
import { loadScript } from '../load-scripts/load-scripts';

export const importRxJS = () => {
  return new Promise<RxJS>((resolve, reject) => {
    if (window.rxjs) {
      resolve(window.rxjs);
    }

    loadScript('https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.0.0-alpha.0/rxjs.umd.min.js')
      .then(() => resolve(window.rxjs))
      .catch(reject);
  });
};

type RxJS = {
  Observable: typeof RxType.Observable;
  ReplaySubject: typeof RxType.ReplaySubject;
  Subject: typeof RxType.Subject;
  animationFrameScheduler: typeof RxType.animationFrameScheduler;
  combineLatest: typeof RxType.combineLatest;
  of: typeof RxType.of;
  operators: {
    bufferCount: typeof operatorsType.bufferCount;
    debounceTime: typeof operatorsType.debounceTime;
    distinctUntilChanged: typeof operatorsType.distinctUntilChanged;
    filter: typeof operatorsType.filter;
    first: typeof operatorsType.first;
    map: typeof operatorsType.map;
    pairwise: typeof operatorsType.pairwise;
    scan: typeof operatorsType.scan;
    shareReplay: typeof operatorsType.shareReplay;
    skip: typeof operatorsType.skip;
    switchMap: typeof operatorsType.switchMap;
    tap: typeof operatorsType.tap;
    withLatestFrom: typeof operatorsType.withLatestFrom;
  };
};

declare global {
  interface Window {
    rxjs: RxJS;
  }
}

// lazy load
export const getRx = () => {
  if (window.rxjs === undefined) {
    throw new Error('RxJS is not imported');
  }

  return window.rxjs as RxJS;
};
