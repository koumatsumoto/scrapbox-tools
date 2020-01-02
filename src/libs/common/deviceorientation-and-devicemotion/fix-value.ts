import { Observable } from 'rxjs';
import { getRx } from '../rxjs';
import { toFixed } from '../arithmetic';
import { OrientationAndMotionSummary, Precision } from './types';

export const fixValue = (precision: Precision = 0) => (
  source: Observable<OrientationAndMotionSummary>,
): Observable<OrientationAndMotionSummary> => {
  const { map } = getRx().operators;

  return source.pipe(
    map((v) => ({
      orientation: {
        absolute: v.orientation.absolute,
        alpha: toFixed(v.orientation.alpha, precision),
        beta: toFixed(v.orientation.beta, precision),
        gamma: toFixed(v.orientation.gamma, precision),
      },
      motion: {
        interval: v.motion.interval,
        acceleration: {
          x: {
            max: toFixed(v.motion.acceleration.x.max, precision),
            min: toFixed(v.motion.acceleration.x.min, precision),
            avg: toFixed(v.motion.acceleration.x.avg, precision),
          },
          y: {
            max: toFixed(v.motion.acceleration.y.max, precision),
            min: toFixed(v.motion.acceleration.y.min, precision),
            avg: toFixed(v.motion.acceleration.y.avg, precision),
          },
          z: {
            max: toFixed(v.motion.acceleration.z.max, precision),
            min: toFixed(v.motion.acceleration.z.min, precision),
            avg: toFixed(v.motion.acceleration.z.avg, precision),
          },
        },
        accelerationIncludingGravity: {
          x: {
            max: toFixed(v.motion.accelerationIncludingGravity.x.max, precision),
            min: toFixed(v.motion.accelerationIncludingGravity.x.min, precision),
            avg: toFixed(v.motion.accelerationIncludingGravity.x.avg, precision),
          },
          y: {
            max: toFixed(v.motion.accelerationIncludingGravity.y.max, precision),
            min: toFixed(v.motion.accelerationIncludingGravity.y.min, precision),
            avg: toFixed(v.motion.accelerationIncludingGravity.y.avg, precision),
          },
          z: {
            max: toFixed(v.motion.accelerationIncludingGravity.z.max, precision),
            min: toFixed(v.motion.accelerationIncludingGravity.z.min, precision),
            avg: toFixed(v.motion.accelerationIncludingGravity.z.avg, precision),
          },
        },
        rotationRate: {
          alpha: {
            max: toFixed(v.motion.rotationRate.alpha.max, precision),
            min: toFixed(v.motion.rotationRate.alpha.min, precision),
            avg: toFixed(v.motion.rotationRate.alpha.avg, precision),
          },
          beta: {
            max: toFixed(v.motion.rotationRate.beta.max, precision),
            min: toFixed(v.motion.rotationRate.beta.min, precision),
            avg: toFixed(v.motion.rotationRate.beta.avg, precision),
          },
          gamma: {
            max: toFixed(v.motion.rotationRate.gamma.max, precision),
            min: toFixed(v.motion.rotationRate.gamma.min, precision),
            avg: toFixed(v.motion.rotationRate.gamma.avg, precision),
          },
        },
      },
    })),
  );
};
