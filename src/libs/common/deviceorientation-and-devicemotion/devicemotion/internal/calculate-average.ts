import { DeviceMotionValue } from '../../types';

export const calculateMotionAverage = (changes: DeviceMotionValue[]): DeviceMotionValue | null => {
  if (changes.length < 1) {
    return null;
  }

  const count = changes.length;
  const summary = changes.reduce((acc, val) => ({
    acceleration: {
      x: acc.acceleration.x + val.acceleration.x,
      y: acc.acceleration.y + val.acceleration.y,
      z: acc.acceleration.z + val.acceleration.z,
    },
    accelerationIncludingGravity: {
      x: acc.accelerationIncludingGravity.x + val.accelerationIncludingGravity.x,
      y: acc.accelerationIncludingGravity.y + val.accelerationIncludingGravity.y,
      z: acc.accelerationIncludingGravity.z + val.accelerationIncludingGravity.z,
    },
    rotationRate: {
      alpha: acc.rotationRate.alpha + val.rotationRate.alpha,
      beta: acc.rotationRate.beta + val.rotationRate.beta,
      gamma: acc.rotationRate.gamma + val.rotationRate.gamma,
    },
  }));

  return {
    acceleration: {
      x: summary.acceleration.x / count,
      y: summary.acceleration.y / count,
      z: summary.acceleration.z / count,
    },
    accelerationIncludingGravity: {
      x: summary.accelerationIncludingGravity.x / count,
      y: summary.accelerationIncludingGravity.y / count,
      z: summary.accelerationIncludingGravity.z / count,
    },
    rotationRate: {
      alpha: summary.rotationRate.alpha / count,
      beta: summary.rotationRate.beta / count,
      gamma: summary.rotationRate.gamma / count,
    },
  };
};
