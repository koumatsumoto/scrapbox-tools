import { Movement } from '../movement/classify-movement';

export const stoppingCount = 4;
export const shortHoldCount = 7;
export const motionEnteringCount = 8;
export const longHoldCount = 10;

const checkHold = (movements: Movement[]): 'long hold' | 'short hold' | 'stopping' | null => {
  let consecutive = 0;
  // check value from right
  for (let i = movements.length - 1; i >= 0; i--) {
    if (movements[i].rate === 0) {
      consecutive++;
    } else {
      break;
    }
  }

  if (consecutive >= longHoldCount) {
    return 'long hold';
  } else if (consecutive >= shortHoldCount) {
    return 'short hold';
  } else if (consecutive >= stoppingCount) {
    return 'stopping';
  } else {
    return null;
  }
};

const isConsecutiveZero = (movements: Movement[], length: number): boolean => {
  if (movements.length !== length) {
    return false;
  }

  for (let i = 0; i < length; i++) {
    if (movements[i].rate !== 0) {
      return false;
    }
  }

  return true;
};

/**
 *
 * 0 -> 0 -> 0 -> 0 -> 0 -> 0 -> 0
 *
 * @param movements
 */
export const isShortHold = (movements: Movement[]): boolean => {
  return isConsecutiveZero(movements, shortHoldCount);
};

/**
 *
 * 0 -> 0 -> 0 -> 0 -> 0 -> 0 -> 0 -> 1
 *
 * @param movements
 */
export const checkEnterMotionType = (movements: Movement[]): 'quick start' | 'slow start' | null => {
  if (movements.length < motionEnteringCount) {
    return null;
  }

  if (isShortHold(movements.slice(-shortHoldCount))) {
    if (movements[movements.length - 1].rate > 1) {
      return 'quick start';
    } else if (movements[movements.length - 1].rate > 0) {
      return 'slow start';
    }
  }

  return null;
};

export const checkHoldAndEntering = (
  movements: Movement[],
): 'long hold' | 'short hold' | 'stopping' | 'quick start' | 'slow start' | null => {
  const hold = checkHold(movements);
  if (hold) {
    return hold;
  } else {
    return checkEnterMotionType(movements);
  }
};

/**
 *
 * 0 -> 0 -> 0 -> 0 -> 0 -> 0 -> 0 -> 0 -> 0 -> 0
 *
 * @param movements
 */
export const isLongHold = (movements: Movement[]): boolean => {
  return isConsecutiveZero(movements, longHoldCount);
};

/**
 *
 * 0 -> 0 -> 0 -> 0
 *
 * @param movements
 */
export const isStopping = (movements: Movement[]): boolean => {
  return isConsecutiveZero(movements, stoppingCount);
};
