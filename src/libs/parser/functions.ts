export const isString = (value: unknown): value is string => typeof value === 'string';

export const pairwise = <T>(array: T[]): [] | [[null, T], ...[T, T][]] => {
  return array.map((value, index) => (index === 0 ? [null, value] : [array[index - 1], value])) as [[null, T], ...[T, T][]];
};

export const threewise = <T>(array: T[]): [] | [[null, T, null]] | [[null, T, T], ...[T, T, T][], [T, T, null]] => {
  return array.map((value, index) => {
    const previous = index === 0 ? null : array[index - 1];
    const next = index === array.length - 1 ? null : array[index + 1];

    return [previous, value, next];
  }) as [] | [[null, T, null]] | [[null, T, T], ...[T, T, T][], [T, T, null]];
};
