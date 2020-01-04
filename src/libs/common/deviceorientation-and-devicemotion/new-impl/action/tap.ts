import { Movement } from '../movement/classify-movement';
import { within } from '../../../arithmetic';
import { simplifyMovements } from './util';

/**
 *
 * // TODO
 * 0 -> 2 -> 3 -> -2
 * 0 -> 2 -> -3 -> 2
 *
 * 0 -> 3 -> -3
 * 0 -> 3 -> -2
 * 0 -> 3 -> -1
 * 0 -> 3 -> 0
 * 1 -> 3 -> -3
 * 1 -> 3 -> -2
 * 1 -> 3 -> -1
 * 1 -> 3 -> 0
 * 1 -> -3 -> -1
 * 1 -> -3 -> 0
 * 1 -> -3 -> 1
 * 1 -> -3 -> 2
 *
 * @param movements
 */
export const isTap = (movements: Movement[]): boolean => {
  if (movements.length < 3) {
    return false;
  }

  const values = simplifyMovements(movements);
  const first = values[0];
  const second = values[1];
  const third = values[2];

  if (first.rate === 0) {
    if (second.rate === 3) {
      if (within(third.rate, -3, 0)) {
        return true;
      }
    }
  }

  if (first.rate === 1) {
    if (second.rate === 3) {
      if (within(third.rate, -3, 0)) {
        return true;
      }
    } else if (second.rate === -3) {
      if (within(third.rate, -1, 2)) {
        return true;
      }
    }
  }

  return false;
};
