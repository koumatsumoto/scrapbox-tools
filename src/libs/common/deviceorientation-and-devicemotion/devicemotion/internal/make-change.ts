import { DeviceMotionValue, DeviceMotion, DeviceMotionWithChange, DeviceMotionAsTuple } from '../../types';
import { floorToInt } from '../../../arithmetic';

export const calculateMotionChange = (prev: DeviceMotionValue, curr: DeviceMotionValue): DeviceMotionValue => ({
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

const calc = (a: number, b: number, c: number) => floorToInt((a - b) / c);

export const makeTuple = (v: DeviceMotionWithChange): DeviceMotionAsTuple => ({
  acceleration: {
    x: [v.data.acceleration.x, v.change.acceleration.x],
    y: [v.data.acceleration.y, v.change.acceleration.y],
    z: [v.data.acceleration.z, v.change.acceleration.z],
  },
  accelerationIncludingGravity: {
    x: [v.data.accelerationIncludingGravity.x, v.change.accelerationIncludingGravity.x],
    y: [v.data.accelerationIncludingGravity.y, v.change.accelerationIncludingGravity.y],
    z: [v.data.accelerationIncludingGravity.z, v.change.accelerationIncludingGravity.z],
  },
  rotationRate: {
    alpha: [v.data.rotationRate.alpha, v.change.rotationRate.alpha],
    beta: [v.data.rotationRate.beta, v.change.rotationRate.beta],
    gamma: [v.data.rotationRate.gamma, v.change.rotationRate.gamma],
  },
});

// TODO: use when refactor withChange operator impl
export const makeChange = (curr: DeviceMotion, diff: DeviceMotion): DeviceMotionAsTuple => ({
  acceleration: {
    x: [curr.acceleration.x, diff.acceleration.x],
    y: [curr.acceleration.y, diff.acceleration.y],
    z: [curr.acceleration.z, diff.acceleration.z],
  },
  accelerationIncludingGravity: {
    x: [curr.accelerationIncludingGravity.x, diff.accelerationIncludingGravity.x],
    y: [curr.accelerationIncludingGravity.y, diff.accelerationIncludingGravity.y],
    z: [curr.accelerationIncludingGravity.z, diff.accelerationIncludingGravity.z],
  },
  rotationRate: {
    alpha: [curr.rotationRate.alpha, diff.rotationRate.alpha],
    beta: [curr.rotationRate.beta, diff.rotationRate.beta],
    gamma: [curr.rotationRate.gamma, diff.rotationRate.gamma],
  },
});

/**
 * @deprecated - wrong implementation, should not divide with interval, values are already calculated as per unit
 */
export const getChangePerMillisecond = (prev: DeviceMotion, curr: DeviceMotion): DeviceMotionValue => ({
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
