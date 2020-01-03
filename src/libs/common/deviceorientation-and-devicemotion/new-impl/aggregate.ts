import { Writeable } from '../../../../types';
import { roundToInt } from '../../arithmetic';

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
export type Aggregation = {
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

type Threshold = {
  high: number;
  mid: number;
  low: number;
  // equalize values if under
  // TODO: consider rename to steady
  round: number;
};

// TODO: make generalize for other types like as alpha, beta, x, y, z
export const defaultThreshold: Threshold = {
  high: 100,
  mid: 40,
  low: 20,
  round: 10,
};

export type MotionClassification = {
  direction: 'up' | 'down';
  // stopping, slightly, low, mid, high
  rate: 0 | 1 | 2 | 3 | 4;
  // all direction of value change is same
  align: boolean;
  steady: boolean;
};

const calcRate = (value: number, threshold: Threshold) => {
  if (value > threshold.high) {
    return 4;
  } else if (value > threshold.mid) {
    return 3;
  } else if (value > threshold.low) {
    return 2;
  } else if (value > threshold.round) {
    return 1;
  } else {
    return 0;
  }
};

export const classificate = (a: Aggregation, threshold: Threshold = defaultThreshold): MotionClassification => {
  if (a.first < a.last) {
    // up
    const rate = calcRate(a.last - a.first, threshold);
    const align = a.count === a.increase;

    return {
      direction: 'up',
      rate,
      align: align,
      steady: rate === 0,
    };
  } else if (a.first > a.last) {
    // down
    const rate = calcRate(a.first - a.last, threshold);
    const align = a.count === a.decrease;

    return {
      direction: 'down',
      rate,
      align,
      steady: rate === 0,
    };
  } else {
    let betweenPositive: number;
    let betweenNegative: number;
    if (a.first > 0) {
      betweenPositive = a.max - a.first;
      betweenNegative = a.min > 0 ? a.first - a.min : Math.abs(a.min - a.first);
    } else {
      betweenPositive = a.max < 0 ? Math.abs(a.first + a.max) : a.max - a.first;
      betweenNegative = Math.abs(a.min + a.first);
    }

    return {
      direction: betweenPositive > betweenNegative ? 'up' : 'down',
      rate: 0,
      align: a.first === a.max && a.first === a.min,
      steady: true,
    };
  }
};

export const aggregate = (values: number[]): Aggregation => {
  if (values.length < 2) {
    throw new Error('bad impl');
  }

  const first = values[0];
  const last = values[values.length - 1];

  const aggregation: Writeable<Aggregation> = {
    count: values.length,
    increase: 0,
    decrease: 0,
    nochange: 0,
    first,
    last,
    max: values[0],
    min: values[0],
    avg: values[0],
  };

  let sum = 0;
  for (let i = 1; i < values.length; i++) {
    const p = values[i - 1];
    const v = values[i];
    if (v > p) {
      aggregation.increase++;
    } else if (v < p) {
      aggregation.decrease++;
    } else {
      aggregation.nochange++;
    }

    sum += v;
    aggregation.max = Math.max(aggregation.max, v);
    aggregation.min = Math.min(aggregation.min, v);
  }

  aggregation.avg = sum / aggregation.count;

  aggregation.avg = roundToInt(aggregation.avg);
  aggregation.min = roundToInt(aggregation.min);
  aggregation.max = roundToInt(aggregation.max);
  aggregation.first = roundToInt(aggregation.first);
  aggregation.last = roundToInt(aggregation.last);

  return aggregation;
};
