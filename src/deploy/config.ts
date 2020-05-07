import * as path from 'path';
import { getEnv } from './environments';

const domain = 'scrapbox.io';
const origin = `https://${domain}`;
const env = getEnv();
const getDistDirPath = (file: string) => path.join(process.cwd(), 'dist', file);

export const config = {
  local: env.local,
  browserWindowWidth: 800,
  browserWindowHeight: 600,
  browserUserAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36',
  origin,
  authCookie: {
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
  /**
   * Targets to deploy UserCSS and UserScript
   */
  projects: [
    {
      name: 'km-study',
      user: 'kou',
      userCSS: getDistDirPath('km-study.min.css'),
      userScript: getDistDirPath('km-study.min.js'),
    },
  ],
} as const;

export type Config = typeof config;
export type ProjectSettings = Config['projects'][number];

const settingsPageName = 'settings';
export const getUserPageUrl = (projectSettings: ProjectSettings) => `${origin}/${projectSettings.name}/${projectSettings.user}`;
export const getSettingsPageUrl = (projectSettings: ProjectSettings) => `${origin}/${projectSettings.name}/${settingsPageName}`;
export const userScriptCodeTitle = 'script.js';
export const userCssCodeTitle = 'style.css';
