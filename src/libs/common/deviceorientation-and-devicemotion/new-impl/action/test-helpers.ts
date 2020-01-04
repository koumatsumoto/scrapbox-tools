import { Movement } from '../movement/classify-movement';

const createMovement = (value: number, direction: Movement['direction'] = 'up'): Movement => {
  let rate = value;
  if (rate < 0) {
    direction = direction === 'up' ? 'down' : 'up';
    rate = -value;
  }

  return {
    orientation: 'up',
    direction,
    rate: rate as Movement['rate'],
    align: false,
  };
};

export const createMovements = (values: number[], direction: Movement['direction'] = 'up'): Movement[] => {
  return values.map((v) => createMovement(v, direction));
};

export const generateNumberCombinations = (min: number, max: number, length: number) => {
  if (min > max || length < 1) {
    throw new Error('invalid arguments');
  }

  const results: number[][] = [];
  const iterate = (counter: number, array: number[]) => {
    if (counter === 0) {
      for (let i = min; i < max; i++) {
        results.push([...array, i]);
      }
    } else {
      for (let i = min; i < max; i++) {
        iterate(counter - 1, [...array, i]);
      }
    }
  };

  iterate(length - 1, []);

  return results;
};
