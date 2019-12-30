import { Observable } from 'rxjs';
import { getRx } from '../rxjs';
import { isEntireDeviceMotionData } from './internal/is-entire-device-motion-data';
import { Precision, simplifyValue } from './internal/simplify-value';
import { EntireDeviceMotionDataWithChange, EntireDeviceMotionData, DeviceMotionData } from './types';
import { getChangePerMillisecond } from './internal/get-change';
import { calculateAverage } from './internal/calculate-average';
import { equalize, Scale } from './internal/equalize';

export const getDeviceMotionStream = () => {
  const Subject = getRx().Subject;
  const subject = new Subject<DeviceMotionData>();

  window.addEventListener('devicemotion', (e: DeviceMotionEvent) => {
    subject.next(e as DeviceMotionData);
  });

  return subject.asObservable();
};

/**
 *
 * @param source - for testing
 */
export const getDeviceMotionWithChangeStream = (
  option: {
    precision: Precision;
    scale: Scale;
  } = { precision: 8, scale: 10000 },
  source: Observable<DeviceMotionData> = getDeviceMotionStream(),
) => {
  const { bufferCount, filter, map, scan, skip } = getRx().operators;

  return source.pipe(
    filter(isEntireDeviceMotionData),
    map((e) => simplifyValue(e, option.precision)),
    scan<EntireDeviceMotionData, EntireDeviceMotionDataWithChange, null>((state, val) => {
      if (state === null) {
        // should be skipped, change is wrong
        return {
          data: val,
          change: val,
        };
      } else {
        return {
          data: val,
          change: getChangePerMillisecond(state.data, val),
        };
      }
    }, null),
    skip(1),
    // TODO: consider parameterize
    bufferCount(10),
    map((changes: EntireDeviceMotionDataWithChange[]) => {
      const avg = calculateAverage(changes.map((c) => c.change));

      return equalize(avg, option.scale);
    }),
  );
};
