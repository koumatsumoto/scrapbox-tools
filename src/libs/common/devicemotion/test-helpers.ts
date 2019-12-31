import { DeviceMotionValue, PartialDeviceMotion, DeviceMotion } from './types';
import { DeepPartial } from '../../../types';

/**
 * For Testing
 */
export const createTestingPartialDeviceMotion = (param: DeepPartial<PartialDeviceMotion> = {}): PartialDeviceMotion => {
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

export const createTestingDeviceMotionValue = (v: number): DeviceMotionValue => ({
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

export const createTestingDeviceMotion = (v: number, interval: number): DeviceMotion => {
  return {
    ...createTestingDeviceMotionValue(v),
    interval,
  };
};

// to test rx streams
export const doNextTick = (fn: Function) => setTimeout(fn);
