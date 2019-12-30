import { DeviceMotionChange, DeviceMotionData, EntireDeviceMotionData } from './types';
import { DeepPartial } from '../../../types';

/**
 * For Testing
 */
export const createTestingDeviceMotionData = (param: DeepPartial<DeviceMotionData> = {}): DeviceMotionData => {
  return {
    acceleration: {
      ...{
        x: 1,
        y: 2,
        z: 3,
      },
      ...param.acceleration,
    },
    accelerationIncludingGravity: {
      ...{
        x: 11,
        y: 12,
        z: 13,
      },
      ...param.accelerationIncludingGravity,
    },
    rotationRate: {
      ...{
        alpha: 21,
        beta: 22,
        gamma: 23,
      },
      ...param.rotationRate,
    },
    interval: 100,
  };
};

export const createTestingDeviceMotionChange = (v: number): DeviceMotionChange => ({
  acceleration: {
    x: v,
    y: v,
    z: v,
  },
  accelerationIncludingGravity: {
    x: v,
    y: v,
    z: v,
  },
  rotationRate: {
    alpha: v,
    beta: v,
    gamma: v,
  },
});
