import { Observable } from 'rxjs';
import { getRx } from '../rxjs';
import { OrientationAndMotionSummary } from './types';

export const makeReadableText = (obj: OrientationAndMotionSummary) =>
  `
orientation: {
  absolute: ${obj.orientation.absolute},
  alpha: ${obj.orientation.alpha},
  beta: ${obj.orientation.beta},
  gamma: ${obj.orientation.gamma},
},
motion: {
  acceleration: {
    x: {
      max: ${obj.motion.acceleration.x.max},
      min: ${obj.motion.acceleration.x.min},
      avg: ${obj.motion.acceleration.x.avg},
    },
    y: {
      max: ${obj.motion.acceleration.y.max},
      min: ${obj.motion.acceleration.y.min},
      avg: ${obj.motion.acceleration.y.avg},
    },
    z: {
      max: ${obj.motion.acceleration.z.max},
      min: ${obj.motion.acceleration.z.min},
      avg: ${obj.motion.acceleration.z.avg},
    },
  },
  rotationRate: {
    alpha: {
      max: ${obj.motion.rotationRate.alpha.max},
      min: ${obj.motion.rotationRate.alpha.min},
      avg: ${obj.motion.rotationRate.alpha.avg},
    },
    beta: {
      max: ${obj.motion.rotationRate.beta.max},
      min: ${obj.motion.rotationRate.beta.min},
      avg: ${obj.motion.rotationRate.beta.avg},
    },
    gamma: {
      max: ${obj.motion.rotationRate.gamma.max},
      min: ${obj.motion.rotationRate.gamma.min},
      avg: ${obj.motion.rotationRate.gamma.avg},
    },
  },
}
  `.trim();

export const forDebug = () => (source: Observable<OrientationAndMotionSummary>) => {
  const { map } = getRx().operators;

  return source.pipe(map(makeReadableText));
};
