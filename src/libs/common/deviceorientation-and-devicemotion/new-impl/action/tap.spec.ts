import { Movement } from '../movement/classify-movement';
import { isTap } from './tap';
import { createMovements } from './test-helpers';

describe('isTap', () => {
  const upBased = (xyz: [number, number, number]) => createMovements(xyz, 'up') as [Movement, Movement, Movement];
  const downBased = (xyz: [number, number, number]) => createMovements(xyz, 'down') as [Movement, Movement, Movement];

  it.each([[upBased], [downBased]])('detect tap', (v: typeof upBased | typeof downBased) => {
    expect(isTap(v([0, 3, 0]))).toBe(true);
    expect(isTap(v([0, 3, -1]))).toBe(true);
    expect(isTap(v([0, 3, -2]))).toBe(true);
    expect(isTap(v([1, 3, 0]))).toBe(true);
    expect(isTap(v([1, 3, -1]))).toBe(true);
    expect(isTap(v([1, 3, -2]))).toBe(true);
    expect(isTap(v([1, 3, -3]))).toBe(true);
    expect(isTap(v([1, -3, 0]))).toBe(true);
    expect(isTap(v([1, -3, 1]))).toBe(true);
    expect(isTap(v([1, -3, 2]))).toBe(true);
  });
});
