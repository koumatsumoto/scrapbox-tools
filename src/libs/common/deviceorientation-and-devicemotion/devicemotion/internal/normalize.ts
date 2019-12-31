import { DeviceMotionAsTuple, ValueAndChange } from '../../types';
import { roundToInt } from '../../../arithmetic';

const defaultThreshold = {
  acceleration: 10 ** 6,
  accelerationIncludingGravity: 10 ** 6,
  rotationRate: 10 ** 7,
} as const;

export type ThresholdOption = {
  acceleration: number;
  accelerationIncludingGravity: number;
  rotationRate: number;
};

const calc = (v: [number, number], threshold: number) => [roundToInt(v[0] / threshold), roundToInt(v[1] / threshold)] as ValueAndChange;
export const normalize = (v: DeviceMotionAsTuple, t: ThresholdOption = defaultThreshold): DeviceMotionAsTuple => ({
  acceleration: {
    x: calc(v.acceleration.x, t.acceleration),
    y: calc(v.acceleration.y, t.acceleration),
    z: calc(v.acceleration.z, t.acceleration),
  },
  accelerationIncludingGravity: {
    x: calc(v.accelerationIncludingGravity.x, t.accelerationIncludingGravity),
    y: calc(v.accelerationIncludingGravity.y, t.accelerationIncludingGravity),
    z: calc(v.accelerationIncludingGravity.z, t.accelerationIncludingGravity),
  },
  rotationRate: {
    alpha: calc(v.rotationRate.alpha, t.rotationRate),
    beta: calc(v.rotationRate.beta, t.rotationRate),
    gamma: calc(v.rotationRate.gamma, t.rotationRate),
  },
});
