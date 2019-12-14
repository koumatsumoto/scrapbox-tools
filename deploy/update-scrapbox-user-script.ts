import * as puppeteer from 'puppeteer';
import { config } from './config';
import { loadBundleJs } from './load-bundle-js';
import { getWholePageText } from './user-page-template';
import { findOrFail, getConfiguredPage, getFullPermissionBrowserContext, setClipboardValue } from './util';

export const updateScrapboxUserScript = async () => {
  const clipboardValue = getWholePageText(await loadBundleJs());
  const textareaSelector = config.selectorToTextarea;

  const browser = await puppeteer.launch();
  const context = await getFullPermissionBrowserContext(browser, config.origin);
  const page = await getConfiguredPage(context);

  await page.goto(config.userPageUrl);
  // wait for react bootstrapping
  await page.waitFor(10000);

  const textareaElement = await findOrFail(page, textareaSelector);

  // setup clipboard
  await textareaElement.click();
  await setClipboardValue(page, clipboardValue);

  // delete existent text and paste
  await page.waitFor(1000);
  await Promise.all([textareaElement.press('Control'), textareaElement.press('a')]);
  await page.waitFor(1000);
  await textareaElement.press('Delete');
  await page.waitFor(1000);
  await Promise.all([textareaElement.press('Control'), textareaElement.press('v')]);
  await page.waitFor(1000 * 10);

  await browser.close();
};
