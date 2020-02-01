import * as puppeteer from 'puppeteer';
import { config } from './config';

export const getFullPermissionBrowserContext = async (browser: puppeteer.Browser, origin: string) => {
  const context = browser.defaultBrowserContext();
  await context.overridePermissions(origin, [
    'geolocation',
    'midi',
    'midi-sysex',
    'notifications',
    'camera',
    'microphone',
    'background-sync',
    'ambient-light-sensor',
    'accelerometer',
    'gyroscope',
    'magnetometer',
    'accessibility-events',
    'clipboard-read',
    'clipboard-write',
    'payment-handler',
  ]);

  return context;
};

export const getConfiguredPage = async (context: puppeteer.BrowserContext) => {
  const page = await context.newPage();
  await page.setViewport({
    width: config.browserWindowWidth,
    height: config.browserWindowHeight,
    deviceScaleFactor: 1,
  });
  await page.setUserAgent(config.browserUserAgent);
  await page.setCookie(config.authCookie);
  // see: https://github.com/puppeteer/puppeteer#debugging-tips
  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));

  return page;
};

export const setClipboardValue = (page: puppeteer.Page, value: string) =>
  page.evaluate((text) => navigator.clipboard.writeText(text), value);

export const findOrFail = async (page: puppeteer.Page, selector: string) => {
  const element = await page.$(selector);
  if (!element) {
    throw new Error(`"${selector}" not found, check latest dom and element in scrapbox.io`);
  }

  return element;
};

export const tryInputAction = async (page: puppeteer.Page, action: () => Promise<unknown>) => {
  await page.waitFor(1000);
  await action();
  await page.waitFor(1000);
};

export const getConfiguredBrowser = () =>
  puppeteer.launch({
    headless: false,
    args: [`--window-size=${config.browserWindowWidth},${config.browserWindowHeight}`],
  });

export const debugClipboard = (page: puppeteer.Page) =>
  page.evaluate(() => {
    navigator.clipboard.readText().then((v) => alert(v));
  });

// value of auth cookie
export const isValidToken = (val: unknown): val is string => typeof val === 'string' && 0 < val.length;
