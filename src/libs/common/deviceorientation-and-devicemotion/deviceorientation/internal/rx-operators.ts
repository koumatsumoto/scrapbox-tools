import { Observable } from 'rxjs';
import { getRx } from '../../../rxjs';
import { DeviceOrientation, PartialDeviceOrientation } from '../../types';
import { roundToInt } from '../../../arithmetic';
import { isEntireDeviceOrientation } from './is-entire-device-orientation';

/**
 * strip unnecessary properties
 */
export const extract = () => (source: Observable<PartialDeviceOrientation>) => {
  const { map } = getRx().operators;

  return source.pipe(
    map((v) => ({
      absolute: v.absolute,
      alpha: v.alpha,
      beta: v.beta,
      gamma: v.gamma,
    })),
  );
};

export const onlyEntire = () => (source: Observable<PartialDeviceOrientation>) => {
  const { filter } = getRx().operators;

  return source.pipe(filter(isEntireDeviceOrientation));
};

export const roundDecimal = () => (source: Observable<DeviceOrientation>) => {
  const { map } = getRx().operators;

  return source.pipe(
    map((v) => ({
      absolute: v.absolute,
      alpha: roundToInt(v.alpha),
      beta: roundToInt(v.beta),
      gamma: roundToInt(v.gamma),
    })),
  );
};
