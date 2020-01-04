export const within = (value: number, min: number, max: number): boolean => {
  if (min > max) {
    throw new Error('invalid arguments');
  }

  for (let i = min; i < max; i++) {
    if (i <= value && value <= max) {
      return true;
    }
  }

  return false;
};
