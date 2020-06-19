// value of auth cookie
export const isValidToken = (val: unknown): val is string => typeof val === 'string' && 0 < val.length;

type Env = {
  // value of auth cookie (scrapbox.id connect.sid)
  TOKEN?: string;
};

export const getEnv = () => {
  const env = process.env as Env;

  if (!isValidToken(env.TOKEN)) {
    throw new Error('process.env.TOKEN is invalid');
  }

  return {
    token: env.TOKEN,
  } as const;
};
