import '../../browser-local-script/global-type';
import * as puppeteer from 'puppeteer';

export const updateScriptText = async (page: puppeteer.Page, codeName: string, text: string) => {
  return page.evaluate(
    (n: string, t: string) => {
      return window
        .waitForMyScriptsReady()
        .then((scripts) => scripts.updateSourceCode(n, t))
        .catch((e) => {
          console.error('[deploy]', e);
          // raise to puppeteer
          throw e;
        });
    },
    codeName,
    text,
  );
};
