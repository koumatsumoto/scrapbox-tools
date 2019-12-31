import { DeviceOrientation, PartialDeviceOrientation } from '../../types';

export const isEntireDeviceOrientation = (e: PartialDeviceOrientation): e is DeviceOrientation => {
  if (e.alpha === null || e.beta === null || e.gamma === null) {
    return false;
  }

  return true;
};
