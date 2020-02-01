import '../../browser-local-script/global-type';
import * as puppeteer from 'puppeteer';
import { loadBrowserScript } from './file-loaders';

export const loadBrowserJavaScript = async (page: puppeteer.Page) => {
  const contents = await loadBrowserScript();

  return page.evaluate((sourceCode) => {
    eval(sourceCode);
  }, contents);
};
