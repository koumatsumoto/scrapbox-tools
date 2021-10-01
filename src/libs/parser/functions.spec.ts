import { pairwise, threewise, threewiseMap } from './functions';

test('pairwise', () => {
  expect(pairwise([])).toEqual([]);
  expect(pairwise([0])).toEqual([[null, 0]]);
  expect(pairwise([0, 1])).toEqual([
    [null, 0],
    [0, 1],
  ]);
});

test('threewise', () => {
  expect(threewise([])).toEqual([]);
  expect(threewise([0])).toEqual([[null, 0, null]]);
  expect(threewise([0, 1])).toEqual([
    [null, 0, 1],
    [0, 1, null],
  ]);
});

test('threewiseMap', () => {
  const project = (curr: number, prev?: number, next?: number) => (prev ?? 1) * curr * (next ?? 1);

  expect(threewiseMap([], project)).toEqual([]);
  expect(threewiseMap([1], project)).toEqual([1]);
  expect(threewiseMap([1, 2], project)).toEqual([2, 4]);
  expect(threewiseMap([1, 2, 3], project)).toEqual([2, 12, 36]);
});
