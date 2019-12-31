/**
 * Used in partially supported device
 */
export type PartialDeviceMotion = {
  readonly interval: number;
  readonly acceleration: {
    readonly x: number | null;
    readonly y: number | null;
    readonly z: number | null;
  };
  readonly accelerationIncludingGravity: {
    readonly x: number | null;
    readonly y: number | null;
    readonly z: number | null;
  };
  readonly rotationRate: {
    readonly alpha: number | null;
    readonly beta: number | null;
    readonly gamma: number | null;
  };
};

/**
 * Used in full-supported device
 */
export type DeviceMotion = {
  readonly interval: number;
  readonly acceleration: {
    readonly x: number;
    readonly y: number;
    readonly z: number;
  };
  readonly accelerationIncludingGravity: {
    readonly x: number;
    readonly y: number;
    readonly z: number;
  };
  readonly rotationRate: {
    readonly alpha: number;
    readonly beta: number;
    readonly gamma: number;
  };
};

export type DeviceMotionValue = {
  acceleration: DeviceMotion['acceleration'];
  accelerationIncludingGravity: DeviceMotion['accelerationIncludingGravity'];
  rotationRate: DeviceMotion['rotationRate'];
};

// TODO: consider unify to DeviceMotionAsTuple
export type DeviceMotionWithChange = {
  data: DeviceMotion;
  change: DeviceMotionValue;
};

export type ValueAndChange = [number, number]; // [value, change from previous]
export type DeviceMotionAsTuple = {
  acceleration: {
    readonly x: ValueAndChange;
    readonly y: ValueAndChange;
    readonly z: ValueAndChange;
  };
  accelerationIncludingGravity: {
    readonly x: ValueAndChange;
    readonly y: ValueAndChange;
    readonly z: ValueAndChange;
  };
  rotationRate: {
    readonly alpha: ValueAndChange;
    readonly beta: ValueAndChange;
    readonly gamma: ValueAndChange;
  };
};

// Allowed precision in this library
export type Precision = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
