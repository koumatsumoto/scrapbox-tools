import * as assert from 'assert';
import {
  findOrFail,
  getConfiguredBrowser,
  getConfiguredPage,
  getFullPermissionBrowserContext,
  setClipboardValue,
  tryInputAction,
} from './util';

export const testBrowserClipboardPermission = async () => {
  const url = 'https://www.google.co.jp';
  const inputElementSelector = 'input[type=text]';
  const clipboardValue = 'value for clipboard!';
  const browser = await getConfiguredBrowser();
  const context = await getFullPermissionBrowserContext(browser, url);
  const page = await getConfiguredPage(context);

  await page.goto(url);
  await page.waitFor(3000);

  const input = await findOrFail(page, inputElementSelector);

  // setup clipboard
  await input.click();
  await setClipboardValue(page, clipboardValue);

  // paste by Ctrl+v
  await tryInputAction(page, () => Promise.all([input.press('Control'), input.press('v')]));

  // assert value is pasted
  const v = await page.$eval(inputElementSelector, (e) => (e as HTMLInputElement).value);
  assert.equal(v, clipboardValue);

  await browser.close();
};
