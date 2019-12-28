/**
 * window.rxjs is loaded by external script
 **/
import * as RxType from 'rxjs';
import * as operatorsType from 'rxjs/operators';

export type RxJS = {
  Subject: typeof RxType.Subject;
  operators: {
    filter: typeof operatorsType.filter;
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
