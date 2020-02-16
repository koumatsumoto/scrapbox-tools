export const isEmpty = (val: string | unknown[]) => val.length < 1;
export const isEmptyDoubleDimensionalArray = (val: unknown[][]) => val.length === 1 && val[0].length === 0;
