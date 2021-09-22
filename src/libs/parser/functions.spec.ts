import { pairwise, threewise } from './functions';

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
