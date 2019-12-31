import { Observable } from 'rxjs';
import { DeviceMotion, DeviceMotionAsTuple, DeviceMotionWithChange, Precision } from '../../types';
import { diff, makeTuple } from './make-change';
import { getRx } from '../../../rxjs';
import { calculateAverage } from './calculate-average';
import { toInt } from './to-int';
import { normalize, ThresholdOption } from './normalize';

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
          change: diff(state.data, val),
        };
      }
    }, null),
    skip(1),
  ) as Observable<DeviceMotionWithChange>;
};

/**
 * @param denominator - default value is 4, used as buffer count
 */
export const toAverage = (denominator: number = 4) => (source: Observable<DeviceMotion>) => {
  const { bufferCount, map } = getRx().operators;

  return source.pipe(
    bufferCount(denominator),
    map((changes: DeviceMotion[]) => calculateAverage(changes)),
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
