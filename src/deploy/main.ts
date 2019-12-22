import { config } from './config';
import { loadCSS, loadJS } from './loaders';
import { getSettingsPageText, getUserPageText } from './templates';
import { updateScrapboxPage } from './update-scrapbox-page';

(async () => {
  const userPageText = getUserPageText(await loadJS());
  const settingsPageText = getSettingsPageText(await loadCSS());

  // deploy user script and user css
  await updateScrapboxPage({ url: config.userPageUrl, text: userPageText });
  await updateScrapboxPage({ url: config.settingsPageUrl, text: settingsPageText });
})()
  .then(() => {
    console.log('deploy completed');
    process.exit();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
