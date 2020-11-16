export const isValidToken = (val: unknown): val is string => typeof val === 'string' && 0 < val.length;
export const validateToken = (token: unknown) => {
  if (!isValidToken(token)) {
    throw new Error('process.env.TOKEN is invalid');
  }
};
