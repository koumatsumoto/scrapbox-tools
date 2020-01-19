// load .env file for development in local
require('dotenv').config();

import { config } from './config';
import { deployByPrivateApi } from './deploy-by-private-api/deploy-by-private-api';
import { loadUserCSS, loadUserScript } from './file-loaders';

(async () => {
  const userPageText = await loadUserScript();
  const settingsPageText = await loadUserCSS();

  // deploy user script and user css
  await Promise.all([
    deployByPrivateApi({ url: config.userPageUrl, codeName: 'script.js', text: userPageText }),
    deployByPrivateApi({ url: config.userPageUrl, codeName: 'style.css', text: settingsPageText }),
  ]);
})()
  .then(() => {
    console.log('deploy completed');
    process.exit();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
