import * as puppeteer from 'puppeteer';
import { config } from './config';
import { isPageUpdatedWithinOneMinute } from './internal-function';
import { findOrFail, getConfiguredPage, getFullPermissionBrowserContext, setClipboardValue } from './util';

export const updatePage = async (param: { url: string; text: string }) => {
  const clipboardValue = param.text;
  const textareaSelector = config.selectorToTextarea;

  const browser = await puppeteer.launch({ headless: !config.local });
  const context = await getFullPermissionBrowserContext(browser, config.origin);
  const page = await getConfiguredPage(context);

  // wait for react bootstrapped
  await page.goto(param.url);
  await page.waitFor(10000);

  // don't deploy if last update time is too much new
  if (await isPageUpdatedWithinOneMinute(page)) {
    throw new Error('page has been updated within one minute, rerun deploy script a little later');
  }

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
