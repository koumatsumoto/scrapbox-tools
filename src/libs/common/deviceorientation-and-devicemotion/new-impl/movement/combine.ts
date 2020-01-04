import { Writeable } from '../../../../../types';
import { roundToInt } from '../../../arithmetic';

/**
 * NOTE:
 *
 * - orientation.gamma
 *   - positive if right
 *   - negative if left
 * - rotationRate.gamma
 *   - positive if tilting to left
 *   - negative if tilting to right
 *
 */
export type CombinedValue = {
  readonly orientation: 'up' | 'down';
  readonly count: number;
  readonly increase: number;
  readonly decrease: number;
  readonly nochange: number;
  readonly first: number;
  readonly last: number;
  readonly max: number;
  readonly min: number;
  readonly avg: number;
};

// TODO: currently used only for gamma
export const combine = (orientation: number, accelerations: number[]): CombinedValue => {
  if (accelerations.length < 2) {
    throw new Error('bad impl');
  }

  const first = accelerations[0];
  const last = accelerations[accelerations.length - 1];

  const movement: Writeable<CombinedValue> = {
    orientation: orientation >= 0 ? 'up' : 'down',
    count: accelerations.length,
    increase: 0,
    decrease: 0,
    nochange: 0,
    first,
    last,
    max: accelerations[0],
    min: accelerations[0],
    avg: accelerations[0],
  };

  let sum = 0;
  for (let i = 1; i < accelerations.length; i++) {
    const p = accelerations[i - 1];
    const v = accelerations[i];
    if (v > p) {
      movement.increase++;
    } else if (v < p) {
      movement.decrease++;
    } else {
      movement.nochange++;
    }

    sum += v;
    movement.max = Math.max(movement.max, v);
    movement.min = Math.min(movement.min, v);
  }

  movement.avg = sum / movement.count;
  movement.avg = roundToInt(movement.avg);
  movement.min = roundToInt(movement.min);
  movement.max = roundToInt(movement.max);
  movement.first = roundToInt(movement.first);
  movement.last = roundToInt(movement.last);

  return movement;
};
