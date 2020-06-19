import * as path from 'path';
import { getEnv } from './environments';

const getDistDirPath = (file: string) => path.join(process.cwd(), 'dist', file);

const env = getEnv();
export const config = {
  token: env.token,
  projects: [
    {
      name: 'km-study',
      user: 'kou',
      userCSS: getDistDirPath('km-study.min.css'),
      userScript: getDistDirPath('km-study.min.js'),
    },
  ],
} as const;

export const settingsPageName = 'settings';
export const userScriptCodeTitle = 'script.js';
export const userCssCodeTitle = 'style.css';
