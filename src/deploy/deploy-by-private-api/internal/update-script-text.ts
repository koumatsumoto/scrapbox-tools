import '../../browser-script/global-type';
import * as puppeteer from 'puppeteer';

export const updateScriptText = async (page: puppeteer.Page, codeName: string, text: string) => {
  page.evaluate(
    (n: string, t: string) => {
      return window
        .waitForMyScriptsReady()
        .then((scripts) => scripts.updateSourceCode(n, t))
        .catch(console.error);
    },
    codeName,
    text,
  );
};
