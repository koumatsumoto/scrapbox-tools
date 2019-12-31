import { Observable } from 'rxjs';
import { getRx } from '../rxjs';
import { isEntireDeviceMotion } from './internal/is-entire-device-motion';
import { DeviceMotion, PartialDeviceMotion, Precision } from './types';
import { ThresholdOption } from './internal/normalize';
import { asTuple, normalizeByThreshold, toAverage, toDebug, toInteger, withChange } from './internal/rx-operators';

export const getPartialDeviceMotionStream = () => {
  const Subject = getRx().Subject;
  const subject = new Subject<PartialDeviceMotion>();

  window.addEventListener('devicemotion', (e: DeviceMotionEvent) => {
    subject.next(e as PartialDeviceMotion);
  });

  return subject.asObservable();
};

export const getEntireDeviceMotionStream = () => {
  const { filter } = getRx().operators;

  return getPartialDeviceMotionStream().pipe(filter(isEntireDeviceMotion)) as Observable<DeviceMotion>;
};

export const getDeviceMotionDataStream = (
  option: {
    averageDenominator?: number;
    precision?: Precision;
    threshold?: ThresholdOption;
  } = {},
  // for testing
  source: Observable<DeviceMotion> = getEntireDeviceMotionStream(),
) => {
  return source.pipe(
    toAverage(option.averageDenominator),
    toInteger(option.precision),
    withChange(),
    asTuple(),
    normalizeByThreshold(option.threshold),
    toDebug(),
  );
};
