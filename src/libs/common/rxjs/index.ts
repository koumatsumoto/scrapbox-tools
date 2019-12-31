/**
 * window.rxjs is loaded by external script
 **/
import * as RxType from 'rxjs';
import * as operatorsType from 'rxjs/operators';

export type RxJS = {
  Observable: typeof RxType.Observable;
  Subject: typeof RxType.Subject;
  animationFrameScheduler: typeof RxType.animationFrameScheduler;
  combineLatest: typeof RxType.combineLatest;
  operators: {
    debounceTime: typeof operatorsType.debounceTime;
    bufferCount: typeof operatorsType.bufferCount;
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
export * from './import-rxjs';
