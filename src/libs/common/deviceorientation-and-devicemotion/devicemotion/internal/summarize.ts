import { DeviceMotionValue, MotionSummary, SummaryValue } from '../../types';

// values must have one more item
export const summarize = (values: number[]): SummaryValue => {
  let max = values[0];
  let min = values[0];
  let sum = values[0];

  for (let i = 1; i < values.length; i++) {
    max = Math.max(max, values[i]);
    min = Math.min(min, values[i]);
    sum += values[i];
  }

  return {
    max,
    min,
    avg: sum / values.length,
  };
};

export const summarizeMotions = (values: DeviceMotionValue[]): MotionSummary | null => {
  const count = values.length;
  if (count < 1) {
    return null;
  }

  const acc = {
    acceleration: {
      x: [] as number[],
      y: [] as number[],
      z: [] as number[],
    },
    accelerationIncludingGravity: {
      x: [] as number[],
      y: [] as number[],
      z: [] as number[],
    },
    rotationRate: {
      alpha: [] as number[],
      beta: [] as number[],
      gamma: [] as number[],
    },
  } as const;

  for (const v of values) {
    acc.acceleration.x.push(v.acceleration.x);
    acc.acceleration.y.push(v.acceleration.y);
    acc.acceleration.z.push(v.acceleration.z);
    acc.accelerationIncludingGravity.x.push(v.accelerationIncludingGravity.x);
    acc.accelerationIncludingGravity.y.push(v.accelerationIncludingGravity.y);
    acc.accelerationIncludingGravity.z.push(v.accelerationIncludingGravity.z);
    acc.rotationRate.alpha.push(v.rotationRate.alpha);
    acc.rotationRate.beta.push(v.rotationRate.beta);
    acc.rotationRate.gamma.push(v.rotationRate.gamma);
  }

  return {
    acceleration: {
      x: summarize(acc.acceleration.x),
      y: summarize(acc.acceleration.y),
      z: summarize(acc.acceleration.z),
    },
    accelerationIncludingGravity: {
      x: summarize(acc.accelerationIncludingGravity.x),
      y: summarize(acc.accelerationIncludingGravity.y),
      z: summarize(acc.accelerationIncludingGravity.z),
    },
    rotationRate: {
      alpha: summarize(acc.rotationRate.alpha),
      beta: summarize(acc.rotationRate.beta),
      gamma: summarize(acc.rotationRate.gamma),
    },
  };
};
