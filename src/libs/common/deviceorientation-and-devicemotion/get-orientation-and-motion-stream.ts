import { getDeviceMotionStream } from './devicemotion';
import { getDeviceOrientationStream } from './deviceorientation/get-device-orientation-stream';
import { Observable } from 'rxjs';
import { DeviceMotion, DeviceOrientation, OrientationAndMotionSummary, Precision } from './types';
import { getRx } from '../rxjs';
import { summarizeMotions } from './devicemotion/internal/summarize';
import { fixValue } from './fix-value';
import { forDebug } from './for-debug';
import { toManipulation } from './make-manipulation';

const defaultOption = {
  interval: 200,
};

/**
 * @param options
 * @param orientation$ - for testing
 * @param motion$ - for testing
 */
export const getOrientationAndMotionStream = (
  option: {
    interval: number;
  } = defaultOption,
  orientation$: Observable<DeviceOrientation> = getDeviceOrientationStream(),
  motion$: Observable<DeviceMotion> = getDeviceMotionStream(),
) => {
  const { Observable } = getRx();

  return new Observable<OrientationAndMotionSummary>((subscriber) => {
    let orientations: DeviceOrientation[] = [];
    let motions: DeviceMotion[] = [];

    orientation$.subscribe((v) => orientations.push(v));
    motion$.subscribe((v) => motions.push(v));

    const id = setInterval(() => {
      if (orientations.length < 1 || motions.length < 1) {
        return;
      }

      const orientation = orientations[orientations.length - 1]!;
      const interval = motions[0].interval; // interval never change in same device
      const summary = summarizeMotions(motions)!;
      orientations = [];
      motions = [];

      subscriber.next({
        orientation,
        motion: {
          interval,
          acceleration: summary.acceleration,
          accelerationIncludingGravity: summary.accelerationIncludingGravity,
          rotationRate: summary.rotationRate,
        },
      });
    }, option.interval);

    return () => clearInterval(id);
  });
};

export const getOrientationAndMotionSummary = (
  option: {
    interval: number;
    precision: Precision;
  } = {
    interval: 200,
    precision: 0,
  },
) => {
  return getOrientationAndMotionStream(option).pipe(fixValue(option.precision), toManipulation());
};

export const getOrientationAndMotionDebugString = (
  option: {
    interval: number;
    precision: Precision;
  } = {
    interval: 200,
    precision: 0,
  },
) => {
  return getOrientationAndMotionStream(option).pipe(fixValue(option.precision), forDebug());
};
