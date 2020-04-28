// load .env file for development in local
require('dotenv').config();

import * as puppeteer from 'puppeteer';
import { config } from './config';
import { deployCssAndScriptForProject } from './internal';

(async () => {
  const browser = await puppeteer.launch({ headless: !config.local });

  // deploy user script and user css for each project.
  // need process one by one to avoid auth error.
  for (const project of config.projects) {
    await deployCssAndScriptForProject(browser, project);
  }

  await browser.close();
})()
  .then(() => {
    console.log('[sx/deploy] deploy completed');
    process.exit();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
