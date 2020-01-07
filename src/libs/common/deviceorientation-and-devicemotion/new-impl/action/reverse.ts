import { Movement } from '../movement/classify-movement';
import { simplifyMovements } from './util';

export const quickReverseCount = 2;

export const isQuickReverse = (movements: Movement[]): boolean => {
  if (movements.length < quickReverseCount) {
    return false;
  }

  const values = simplifyMovements(movements);
  const first = values[0];
  const second = values[1];

  if (first.rate < 3) {
    return false;
  }

  if (second.rate > 0) {
    return false;
  }

  return true;
};
