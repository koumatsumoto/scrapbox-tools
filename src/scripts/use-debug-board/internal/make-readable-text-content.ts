import { OrientationAndMotion } from '../../../libs/common/deviceorientation-and-devicemotion';

export const makeReadableTextContent = (obj: OrientationAndMotion) =>
  `
orientation: {
  absolute: ${obj.orientation.absolute},
  alpha: ${obj.orientation.alpha},
  beta: ${obj.orientation.beta},
  gamma: ${obj.orientation.gamma},
}
acceleration: {
  x: [${obj.acceleration.x[0]}, ${obj.acceleration.x[1]}]
  y: [${obj.acceleration.y[0]}, ${obj.acceleration.y[1]}]
  z: [${obj.acceleration.z[0]}, ${obj.acceleration.z[1]}]
}
rotationRate: {
  alpha: [${obj.rotationRate.alpha[0]}, ${obj.rotationRate.alpha[1]}],
  beta: [${obj.rotationRate.beta[0]}, ${obj.rotationRate.beta[1]}],
  gamma: [${obj.rotationRate.gamma[0]}, ${obj.rotationRate.gamma[1]}],
}
  `.trim();
