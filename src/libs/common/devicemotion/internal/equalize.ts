import { DeviceMotionChange } from '../types';
import { toInt } from '../../arithmetic';

export type Scale = 10 | 100 | 1000 | 10000 | 100000 | 1000000;
export const equalize = (val: DeviceMotionChange, scale: Scale) => ({
  acceleration: {
    x: toInt(val.acceleration.x / scale),
    y: toInt(val.acceleration.y / scale),
    z: toInt(val.acceleration.z / scale),
  },
  accelerationIncludingGravity: {
    x: toInt(val.accelerationIncludingGravity.x / scale),
    y: toInt(val.accelerationIncludingGravity.y / scale),
    z: toInt(val.accelerationIncludingGravity.z / scale),
  },
  rotationRate: {
    alpha: toInt(val.rotationRate.alpha / scale),
    beta: toInt(val.rotationRate.beta / scale),
    gamma: toInt(val.rotationRate.gamma / scale),
  },
});
