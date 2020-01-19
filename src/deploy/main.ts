// load .env file for development in local
require('dotenv').config();

import * as puppeteer from 'puppeteer';
import { config } from './config';
import { deployByPrivateApi } from './deploy-by-private-api/deploy-by-private-api';
import { loadUserCSS, loadUserScript } from './file-loaders';

(async () => {
  const userPageText = await loadUserScript();
  const settingsPageText = await loadUserCSS();
  const browser = await puppeteer.launch({ headless: !config.local });

  // deploy user script and user css
  await Promise.all([
    deployByPrivateApi({ browser, url: config.userPageUrl, codeName: 'script.js', text: userPageText }),
    deployByPrivateApi({ browser, url: config.settingsPageUrl, codeName: 'style.css', text: settingsPageText }),
  ]);

  await browser.close();
})()
  .then(() => {
    console.log('deploy completed');
    process.exit();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
