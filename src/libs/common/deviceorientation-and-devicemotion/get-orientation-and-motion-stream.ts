import { getDeviceMotionStream } from './devicemotion';
import { getDeviceOrientationStream } from './deviceorientation/get-device-orientation-stream';
import { getRx } from '../rxjs';
import { Observable } from 'rxjs';
import { DeviceMotionAsTuple, DeviceOrientation, OrientationAndMotion } from './types';

const make = (values: [DeviceOrientation, DeviceMotionAsTuple]): OrientationAndMotion => ({
  orientation: values[0],
  acceleration: values[1].acceleration,
  accelerationIncludingGravity: values[1].accelerationIncludingGravity,
  rotationRate: values[1].rotationRate,
});

/**
 * @param orientation$ - for testing
 * @param motion$ - for testing
 */
export const getOrientationAndMotionStream = (
  orientation$: Observable<DeviceOrientation> = getDeviceOrientationStream(),
  motion$: Observable<DeviceMotionAsTuple> = getDeviceMotionStream(),
) => {
  const { map, withLatestFrom } = getRx().operators;

  return orientation$.pipe(withLatestFrom(motion$), map(make));
};
