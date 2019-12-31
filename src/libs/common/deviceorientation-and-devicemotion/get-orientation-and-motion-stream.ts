import { getDeviceMotionStream } from './devicemotion';
import { getDeviceOrientationStream } from './deviceorientation/get-device-orientation-stream';
import { getRx } from '../rxjs';

export const getOrientationAndMotionStream = () => {
  const { combineLatest } = getRx();
  const orientation$ = getDeviceOrientationStream();
  const motion$ = getDeviceMotionStream();

  return combineLatest(orientation$, motion$);
};
