import { Movement } from '../movement/classify-movement';

export type RelativeMovement = {
  rate: -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5;
  // all direction of value change is same
  align: boolean;
};

export const simplifyMovements = (movements: Movement[]): RelativeMovement[] => {
  if (movements.length < 1) {
    return [];
  }

  let baseDirection: Movement['direction'] | undefined;
  return movements.map((m) => {
    if (baseDirection === undefined && m.rate !== 0) {
      baseDirection = m.direction;
    }

    if (baseDirection === undefined || m.direction === baseDirection) {
      return {
        rate: m.rate,
        align: m.align,
      };
    } else {
      return {
        // avoid -0
        rate: m.rate === 0 ? 0 : (-m.rate as RelativeMovement['rate']),
        align: m.align,
      };
    }
  });
};

export const contain = (source: number[], pattern: number[]): boolean => {
  for (let i = 0; i <= source.length - pattern.length; i++) {
    let mismatch = false;
    for (let j = 0; j < pattern.length; j++) {
      if (pattern[j] === source[i + j]) {
        continue;
      } else {
        mismatch = true;
        break;
      }
    }

    if (!mismatch) {
      return true;
    }
  }

  return false;
};
