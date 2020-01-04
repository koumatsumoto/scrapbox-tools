import { Observable } from 'rxjs';
import { DeviceMotion, DeviceOrientation } from '../types';
import { getDeviceOrientationStream } from '../deviceorientation/get-device-orientation-stream';
import { getDeviceMotionStream } from '../devicemotion';
import { getRx, withHistory } from '../../rxjs';
import { roundToInt } from '../../arithmetic';
import { combine } from './movement/combine';
import { ActionTypes } from './types';
import { isTap } from './action/tap';
import { classify, Movement } from './movement/classify-movement';
import { simplifyMovements } from './action/util';

export const get4MotionWithOrientationStream = (
  orientation$: Observable<DeviceOrientation> = getDeviceOrientationStream(),
  motion$: Observable<DeviceMotion> = getDeviceMotionStream(),
) => {
  const { bufferCount, withLatestFrom } = getRx().operators;

  return motion$.pipe(bufferCount(4), withLatestFrom(orientation$));
};

// to check data by same sid
let singletonToDebug: Observable<{ sid: number; direction: string; data: Movement }>;
export const getMovementStream = () => {
  const { map } = getRx().operators;
  let sid = 0;

  if (singletonToDebug) {
    return singletonToDebug;
  }

  singletonToDebug = get4MotionWithOrientationStream().pipe(
    map(([motions, orientation]) => {
      const gammas = motions.map((m) => m.rotationRate.gamma);
      const aggregation = combine(orientation.gamma, gammas);
      const data = classify(aggregation);

      const direction = orientation.gamma > 0 ? 'right' : 'left';

      return {
        sid: sid++,
        direction,
        data,
      };
    }),
  );

  return singletonToDebug;
};

export const debug3 = () => {
  const { filter, map } = getRx().operators;

  return getMovementStream().pipe(
    filter((d) => d.data.rate > 0),
    map((d) => {
      const di = d.data.direction === 'up' ? 'u' : 'd';
      return `${di}-${d.data.rate}: ${d.sid}`;
    }),
    withHistory(20),
    map((array) => array.reverse()),
  );
};

/**
 * orientation and motion aggregation raw data for gamma
 */
export const debug4 = () => {
  const { map } = getRx().operators;

  return get4MotionWithOrientationStream().pipe(
    map(([motions, orientation]) => {
      const gammas = motions.map((m) => m.rotationRate.gamma);
      const aggregation = combine(orientation.gamma, gammas);

      return {
        gamma: roundToInt(orientation.gamma),
        aggregation,
      };
    }),
  );
};

type CommandData = {
  command: ActionTypes;
  // [first, last]
  sid?: [number, number];
};

export const getMotionCommandStream = () => {
  const { Observable } = getRx();
  const { map } = getRx().operators;
  const minimumRequiredCount = 3;

  return new Observable<CommandData>((subscriber) => {
    let actionSubmittedId = -1;
    getMovementStream()
      .pipe(
        withHistory(8),
        map((items) => {
          // targets at least 1 item
          const targets = items.filter((m) => m.sid > actionSubmittedId);
          if (targets.length < minimumRequiredCount) {
            return {
              command: 'waiting',
            };
          }

          const first = targets[0];
          const last = targets[targets.length - 1];
          const tap = isTap(targets.map((m) => m.data));
          let actionType: ActionTypes = 'none';
          if (tap) {
            actionType = 'tap';
            actionSubmittedId = last.sid;
          } else {
            actionSubmittedId = first.sid;
          }

          return {
            command: actionType,
            sid: [first.sid, last.sid],
            debug: simplifyMovements(targets.map((m) => m.data)),
          };
        }),
      )
      .subscribe((value) => {
        subscriber.next(value as CommandData);
      });
  });
};

export const getCommandHistoryStream = () => {
  const { map } = getRx().operators;

  return getMotionCommandStream().pipe(
    withHistory(32),
    map((values) => values.map((v) => v.command).reverse()),
  );
};

export const getLastCommandStream = () => {
  const { filter, pairwise } = getRx().operators;

  return getMotionCommandStream().pipe(
    filter((c) => {
      if (c.command === 'none' || c.command === 'waiting') {
        return false;
      } else {
        return true;
      }
    }),
    // pairwise(),
  );
};
