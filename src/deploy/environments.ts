import { isValidToken } from './util';

type Env = {
  // whether script run on local environment (for development and debug)
  LOCAL?: 'yes';
  // value of auth cookie (scrapbox.id connect.sid)
  TOKEN?: string;
};

export const getEnv = () => {
  const env = process.env as Env;

  if (!isValidToken(env.TOKEN)) {
    throw new Error('process.env.TOKEN is invalid');
  }

  return {
    local: env.LOCAL === 'yes',
    token: env.TOKEN,
  } as const;
};
