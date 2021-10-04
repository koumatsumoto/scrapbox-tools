import { extractLinks, extractTags, extractTexts, pairwise, threewise, threewiseMap } from './functions';

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

test('extractTags', () => {
  expect(extractTags(undefined)).toEqual([]);
  expect(extractTags({ type: 'hashTag', unit: { content: 'tag', page: 'tag', tag: '#', whole: '#tag' } })).toEqual(['tag']);
  expect(
    extractTags([
      { type: 'hashTag', unit: { content: 'a', page: 'a', tag: '#', whole: '#a' } },
      { type: 'hashTag', unit: { content: 'b', page: 'b', tag: '#', whole: '#b' } },
    ]),
  ).toEqual(['a', 'b']);
});

test('extractLinks', () => {
  expect(extractLinks(undefined)).toEqual([]);
  expect(extractLinks({ type: 'link', unit: { whole: '[page]', content: 'page', page: 'page' } })).toEqual(['page']);
  expect(
    extractLinks([
      { type: 'link', unit: { whole: '[a]', content: 'a', page: 'a' } },
      { type: 'link', unit: { whole: '[b]', content: 'b', page: 'b' } },
    ]),
  ).toEqual(['a', 'b']);
});

test('extractTexts', () => {
  expect(extractTexts(undefined)).toEqual([]);
  expect(extractTexts('text')).toEqual(['text']);
  expect(extractTexts(['a', { type: 'link', unit: { whole: '[a]', content: 'a', page: 'a' } }, 'b'])).toEqual(['a', 'b']);
});
