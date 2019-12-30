export type DeviceMotionData = {
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
  readonly interval: number;
  readonly rotationRate: {
    readonly alpha: number | null;
    readonly beta: number | null;
    readonly gamma: number | null;
  };
};

export type EntireDeviceMotionData = {
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
  readonly interval: number;
  readonly rotationRate: {
    readonly alpha: number;
    readonly beta: number;
    readonly gamma: number;
  };
};

export type DeviceMotionChange = {
  acceleration: EntireDeviceMotionData['acceleration'];
  accelerationIncludingGravity: EntireDeviceMotionData['accelerationIncludingGravity'];
  rotationRate: EntireDeviceMotionData['rotationRate'];
};

export type EntireDeviceMotionDataWithChange = {
  data: EntireDeviceMotionData;
  change: DeviceMotionChange;
};
