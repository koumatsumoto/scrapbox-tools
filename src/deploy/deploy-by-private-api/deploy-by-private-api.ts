import * as puppeteer from 'puppeteer';
import { config } from '../config';
import { getConfiguredPage, getFullPermissionBrowserContext } from '../util';
import { loadBrowserJavaScript } from './internal/load-browser-java-script';
import { updateScriptText } from './internal/update-script-text';

const applicationBootstrapWaitTime = 1000 * 8;

export const deployByPrivateApi = async (param: { url: string; codeName: string; text: string }) => {
  const browser = await puppeteer.launch({ headless: !config.local });
  const context = await getFullPermissionBrowserContext(browser, config.origin);
  const page = await getConfiguredPage(context);

  // wait for react bootstrapped
  await page.goto(param.url);
  await page.waitFor(applicationBootstrapWaitTime);

  // load scripts to use private-api
  await loadBrowserJavaScript(page);

  // wait for ws ready
  // TODO: can remove if websocket client notify setup completed
  await page.waitFor(1000 * 8);

  // update script text
  await updateScriptText(page, param.codeName, param.text);

  // wait for ws ready
  // TODO: can remove if websocket client notify setup completed
  await page.waitFor(1000 * 2);

  await page.waitFor(2000);
  await page.close();
  await browser.close();
};
