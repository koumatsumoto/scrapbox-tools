import { DeviceOrientation, DeviceOrientationValue } from '../../types';

export const calculateOrientationChange = (curr: DeviceOrientation, prev: DeviceOrientation): DeviceOrientationValue => {
  return {
    alpha: curr.alpha - prev.alpha,
    beta: curr.beta - prev.beta,
    gamma: curr.gamma - prev.alpha,
  };
};
