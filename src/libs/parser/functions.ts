export const isString = (value: unknown): value is string => typeof value === 'string';

export const pairwise = <T>(array: T[]): [] | [[null, T], ...[T, T][]] => {
  return array.map((value, index) => (index === 0 ? [null, value] : [array[index - 1], value])) as [[null, T], ...[T, T][]];
};

// @deprecated
export const threewise = <T, U = T>(array: T[]): [] | [[null, T | U, null]] | [[null, T | U, T], ...[U, T | U, T][], [U, T | U, null]] => {
  return array.map((value, index) => {
    const previous = index === 0 ? null : array[index - 1];
    const next = index === array.length - 1 ? null : array[index + 1];

    return [previous, value, next];
  }) as [] | [[null, T, null]] | [[null, T | U, T], ...[U, T | U, T][], [U, T | U, null]];
};

export const threewiseMap = <T, U>(array: T[], project: (value: T, prev: U | undefined, next: T | undefined, index: number) => U): U[] => {
  const mapped: U[] = [];

  for (let i = 0; i < array.length; i++) {
    const prev = mapped[i - 1];
    const curr = array[i];
    const next = array[i + 1];

    mapped.push(project(curr, prev, next, i));
  }

  return mapped;
};
