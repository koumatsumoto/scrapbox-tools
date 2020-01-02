import { Observable } from 'rxjs';
import { DeviceMotion, DeviceMotionAsTuple, DeviceMotionValue, DeviceMotionWithChange, PartialDeviceMotion, Precision } from '../../types';
import { getRx } from '../../../rxjs';
import { calculateMotionChange, makeTuple } from './make-change';
import { calculateMotionAverage } from './calculate-average';
import { toInt } from './to-int';
import { normalize, ThresholdOption } from './normalize';
import { isEntireDeviceMotion } from './is-entire-device-motion';

// TODO: use pairwise
export const withChange = () => (source: Observable<DeviceMotion>) => {
  const { scan, skip } = getRx().operators;

  return source.pipe(
    scan<DeviceMotion, DeviceMotionWithChange, null>((state, val) => {
      if (state === null) {
        return {
          data: val,
          // must be skipped below, skip(1)
          change: undefined as any,
        };
      } else {
        return {
          data: val,
          change: calculateMotionChange(state.data, val),
        };
      }
    }, null),
    skip(1),
  ) as Observable<DeviceMotionWithChange>;
};

/**
 * @param denominator - default value is 4, used as buffer count
 */
export const toAverage = (denominator = 4) => (source: Observable<DeviceMotionValue>) => {
  const { bufferCount, map } = getRx().operators;

  return source.pipe(
    bufferCount(denominator),
    map((items: DeviceMotionValue[]) => calculateMotionAverage(items)),
  );
};

export const toInteger = (precision: Precision = 8) => (source: Observable<DeviceMotion>) => {
  const { map } = getRx().operators;

  return source.pipe(map((v) => toInt(v, precision)));
};

export const asTuple = () => (source: Observable<DeviceMotionWithChange>) => {
  const { map } = getRx().operators;

  return source.pipe(map(makeTuple));
};

export const normalizeByThreshold = (threshold?: ThresholdOption) => (source: Observable<DeviceMotionAsTuple>) => {
  const { map } = getRx().operators;

  return source.pipe(map((v) => normalize(v, threshold)));
};

export const onlyEntire = () => (source: Observable<PartialDeviceMotion>) => {
  const { filter } = getRx().operators;

  return source.pipe(filter(isEntireDeviceMotion));
};
