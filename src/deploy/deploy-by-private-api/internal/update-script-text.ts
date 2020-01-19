import '../../browser-script/global-type';
import * as puppeteer from 'puppeteer';

export const updateScriptText = async (page: puppeteer.Page, codeName: string, text: string) => {
  page.evaluate(
    (n: string, t: string) => {
      if (!window.__myScripts) {
        throw new Error('script is not loaded');
      }

      window.__myScripts.updateSourceCode(n, t);
    },
    codeName,
    text,
  );
};
