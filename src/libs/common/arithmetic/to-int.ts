/**
 * NOTE: an argument is passed to Number.parseInt as string, to improve performance
 *
 * @param x
 */
export const floorToInt = (x: number) => Number.parseInt((x as unknown) as string);

export const roundToInt = (x: number) => Math.round(x);
