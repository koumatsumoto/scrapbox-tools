import { getEnv } from './environments';
import { userPageTemplate } from './user-page-template';

const domain = 'scrapbox.io';
const origin = `https://${domain}`;
const env = getEnv();

export const config = {
  browserWindowWidth: 800,
  browserWindowHeight: 600,
  browserUserAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36',
  userPageUrl: `${origin}/${env.project}/${env.user}`,
  origin,
  cookieToAuth: {
    /** The cookie name. */
    name: 'connect.sid',
    /** The cookie value. */
    value: env.token,
    /** The cookie domain. */
    domain,
    /** The cookie path. */
    path: '/',
    /** The cookie http only flag. */
    httpOnly: true,
    /** The session cookie flag. */
    session: false,
    /** The cookie secure flag. */
    secure: true,
  },
  userPageTemplate,
  selectorToTextarea: '#text-input',
} as const;
