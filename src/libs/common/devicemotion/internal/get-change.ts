import { DeviceMotionChange, EntireDeviceMotionData } from '../types';
import { toInt } from '../../arithmetic';

export const getChange = (prev: EntireDeviceMotionData, curr: EntireDeviceMotionData): DeviceMotionChange => ({
  acceleration: {
    x: curr.acceleration.x - prev.acceleration.x,
    y: curr.acceleration.y - prev.acceleration.y,
    z: curr.acceleration.z - prev.acceleration.z,
  },
  accelerationIncludingGravity: {
    x: curr.accelerationIncludingGravity.x - prev.accelerationIncludingGravity.x,
    y: curr.accelerationIncludingGravity.y - prev.accelerationIncludingGravity.y,
    z: curr.accelerationIncludingGravity.z - prev.accelerationIncludingGravity.z,
  },
  rotationRate: {
    alpha: curr.rotationRate.alpha - prev.rotationRate.alpha,
    beta: curr.rotationRate.beta - prev.rotationRate.beta,
    gamma: curr.rotationRate.gamma - prev.rotationRate.gamma,
  },
});

const calc = (a: number, b: number, c: number) => toInt((a - b) / c);

export const getChangePerMillisecond = (prev: EntireDeviceMotionData, curr: EntireDeviceMotionData): DeviceMotionChange => ({
  acceleration: {
    x: calc(curr.acceleration.x, prev.acceleration.x, curr.interval),
    y: calc(curr.acceleration.y, prev.acceleration.y, curr.interval),
    z: calc(curr.acceleration.z, prev.acceleration.z, curr.interval),
  },
  accelerationIncludingGravity: {
    x: calc(curr.accelerationIncludingGravity.x, prev.accelerationIncludingGravity.x, curr.interval),
    y: calc(curr.accelerationIncludingGravity.y, prev.accelerationIncludingGravity.y, curr.interval),
    z: calc(curr.accelerationIncludingGravity.z, prev.accelerationIncludingGravity.z, curr.interval),
  },
  rotationRate: {
    alpha: calc(curr.rotationRate.alpha, prev.rotationRate.alpha, curr.interval),
    beta: calc(curr.rotationRate.beta, prev.rotationRate.beta, curr.interval),
    gamma: calc(curr.rotationRate.gamma, prev.rotationRate.gamma, curr.interval),
  },
});
