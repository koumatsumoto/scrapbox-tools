export const tail = <T extends any>(array: T[]): T[] => {
  const [, ...tail] = array;

  return tail;
};
