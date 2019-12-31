// load .env file for development in local
require('dotenv').config();

import { config } from './config';
import { loadCSS, loadJS } from './loaders';
import { getSettingsPageText, getUserPageText } from './templates';
import { updatePage } from './update-page';

(async () => {
  const userPageText = getUserPageText(await loadJS());
  const settingsPageText = getSettingsPageText(await loadCSS());

  // deploy user script and user css
  await Promise.all([
    updatePage({ url: config.userPageUrl, text: userPageText }),
    updatePage({ url: config.settingsPageUrl, text: settingsPageText }),
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
