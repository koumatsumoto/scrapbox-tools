import { DeviceMotion, Precision } from '../../types';

const ti = (v: number, exponentiation: number) => {
  return Number.parseInt((v * exponentiation).toFixed(0));
};

export const toInt = (data: DeviceMotion, precision: Precision = 8): DeviceMotion => {
  const e = 10 ** precision;

  return {
    interval: data.interval,
    acceleration: {
      x: ti(data.acceleration.x, e),
      y: ti(data.acceleration.y, e),
      z: ti(data.acceleration.z, e),
    },
    accelerationIncludingGravity: {
      x: ti(data.accelerationIncludingGravity.x, e),
      y: ti(data.accelerationIncludingGravity.y, e),
      z: ti(data.accelerationIncludingGravity.z, e),
    },
    rotationRate: {
      alpha: ti(data.rotationRate.alpha, e),
      beta: ti(data.rotationRate.beta, e),
      gamma: ti(data.rotationRate.gamma, e),
    },
  };
};
