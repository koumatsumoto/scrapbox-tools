import { Observable } from 'rxjs';
import { DeviceMotion, DeviceOrientation } from '../types';
import { getDeviceOrientationStream } from '../deviceorientation/get-device-orientation-stream';
import { getDeviceMotionStream } from '../devicemotion';
import { getRx, withHistory } from '../../rxjs';
import { combine } from './movement/combine';
import { ActionTypes } from './types';
import { isTap } from './action/tap';
import { classify, Movement } from './movement/classify-movement';
import { checkEnterMotionType, isLongHold, isShortHold } from './action/hold';

export const getMovementStream = (
  orientation$: Observable<DeviceOrientation> = getDeviceOrientationStream(),
  motion$: Observable<DeviceMotion> = getDeviceMotionStream(),
): Observable<{ sid: number; data: Movement }> => {
  const { bufferCount, map, withLatestFrom } = getRx().operators;

  let sid = 0;
  return motion$.pipe(
    bufferCount(4),
    withLatestFrom(orientation$),
    map(([motions, orientation]) => {
      const gammas = motions.map((m) => m.rotationRate.gamma);
      const aggregation = combine(orientation.gamma, gammas);
      const data = classify(aggregation);

      return {
        sid: sid++,
        data,
      };
    }),
  );
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

type Action = {
  type: ActionTypes;
  // [first, last]
  sid?: number[];
};

export const getActionStream = () => {
  const { Observable } = getRx();
  const { map } = getRx().operators;
  const movementCount = 10;
  const firstIndex = 0;
  const lastIndex = movementCount - 1;

  return new Observable<Action>((subscriber) => {
    getMovementStream()
      .pipe(
        withHistory(movementCount),
        map((items) => {
          const movements = items.map((m) => m.data);
          const sid = [items[0].sid, items[items.length - 1].sid];

          // check long hold
          if (movements[lastIndex].rate === 0 && movements[firstIndex].rate === 0) {
            if (isLongHold(movements)) {
              return {
                type: 'long hold',
                sid,
              };
            }
          }

          const array: Movement[] = [];
          for (let i = 1; array.length <= 5; i++) {
            array.unshift(movements[movements.length - i]);

            switch (array.length) {
              case 3: {
                if (isTap(array)) {
                  return {
                    type: 'tap',
                    sid,
                  };
                }

                break;
              }
              case 6: {
                if (isShortHold(array)) {
                  return {
                    type: 'short hold',
                    sid,
                  };
                }

                break;
              }
              case 7: {
                const type = checkEnterMotionType(array);
                if (type && type === 'slow') {
                  return {
                    type: 'start motion slowly',
                    sid,
                  };
                } else if (type && type === 'quick') {
                  return {
                    type: 'start motion quickly',
                    sid,
                  };
                }

                break;
              }
            }
          }

          return {
            type: 'moving',
            sid,
          };
        }),
      )
      .subscribe((value) => {
        subscriber.next(value as Action);
      });
  });
};

export const getCommandHistoryStream = () => {
  const { map } = getRx().operators;

  return getActionStream().pipe(
    withHistory(32),
    map((values) => values.map((v) => v.type).reverse()),
  );
};

export const getLastCommandStream = () => {
  const { distinctUntilChanged, map } = getRx().operators;

  return getActionStream().pipe(
    map((v) => v.type),
    distinctUntilChanged(),
    withHistory(8),
    map((values) => values.reverse()),
  );
};

type Command = {
  type: string;
  // [first, last]
  sid?: number[];
};

export const getCommandStream = () => {
  const { Observable } = getRx();
  const { map } = getRx().operators;
  const actionCount = 6;

  return new Observable<Action>((subscriber) => {
    getActionStream().pipe(
      withHistory(actionCount),
      map((action) => {
        // not implemented
      }),
    );
  });
};
