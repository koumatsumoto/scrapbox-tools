import { EntireDeviceMotionData } from '../types';

export type Precision = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
const toInteger = (v: number, precision: Precision = 4) => {
  const multiplied = v * 10 ** precision;

  return Number.parseInt(multiplied.toFixed(0));
};

export const simplifyValue = (data: EntireDeviceMotionData, precision: Precision = 8): EntireDeviceMotionData => ({
  acceleration: {
    x: toInteger(data.acceleration.x, precision),
    y: toInteger(data.acceleration.y, precision),
    z: toInteger(data.acceleration.z, precision),
  },
  accelerationIncludingGravity: {
    x: toInteger(data.accelerationIncludingGravity.x, precision),
    y: toInteger(data.accelerationIncludingGravity.y, precision),
    z: toInteger(data.accelerationIncludingGravity.z, precision),
  },
  interval: data.interval,
  rotationRate: {
    alpha: toInteger(data.rotationRate.alpha, precision),
    beta: toInteger(data.rotationRate.beta, precision),
    gamma: toInteger(data.rotationRate.gamma, precision),
  },
});
