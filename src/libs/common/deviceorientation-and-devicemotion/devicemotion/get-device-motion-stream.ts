import { Observable } from 'rxjs';
import { getRx } from '../../rxjs';
import { DeviceMotion, PartialDeviceMotion, Precision } from '../types';
import { ThresholdOption } from './internal/normalize';
import { asTuple, normalizeByThreshold, onlyEntire, toInteger, withChange } from './internal/rx-operators';

export const getDeviceMotionEventStream = () => {
  const Subject = getRx().Subject;
  const subject = new Subject<PartialDeviceMotion>();

  window.addEventListener('devicemotion', (e: DeviceMotionEvent) => {
    subject.next(e);
  });

  return subject.asObservable();
};

export const getDeviceMotionStream = () => {
  return getDeviceMotionEventStream().pipe(onlyEntire()) as Observable<DeviceMotion>;
};

export const deprecatedGetDeviceMotionStream = (
  option: {
    precision?: Precision;
    threshold?: ThresholdOption;
  } = {},
  // for testing
  source: Observable<DeviceMotion> = getDeviceMotionStream(),
) => {
  return source.pipe(toInteger(option.precision), withChange(), asTuple(), normalizeByThreshold(option.threshold));
};
