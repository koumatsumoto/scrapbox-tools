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
  await updatePage({ url: config.userPageUrl, text: userPageText });
  await updatePage({ url: config.settingsPageUrl, text: settingsPageText });
})()
  .then(() => {
    console.log('deploy completed');
    process.exit();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
