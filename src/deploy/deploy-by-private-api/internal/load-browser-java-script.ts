import '../../browser-script/global-type';
import * as puppeteer from 'puppeteer';
import { loadBrowserScript } from '../../file-loaders';

export const loadBrowserJavaScript = async (page: puppeteer.Page) => {
  const contents = await loadBrowserScript();
  page.evaluate((sourceCode) => {
    return new Promise<void>((resolve, reject) => {
      try {
        eval(sourceCode);
        window
          .waitForMyScriptsReady()
          .then(resolve)
          .catch(reject);
      } catch (e) {
        reject(e);
      }
    });
  }, contents);
};
