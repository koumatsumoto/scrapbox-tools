import * as puppeteer from 'puppeteer';
import { Config, config, getSettingsPageUrl, getUserPageUrl, userCssCodeTitle, userScriptCodeTitle } from '../config';
import { getConfiguredPage, getFullPermissionBrowserContext } from '../util';
import { loadSourceCode } from './internal/file-loaders';
import { loadBrowserJavaScript } from './internal/load-browser-java-script';
import { updateScriptText } from './internal/update-script-text';

const applicationBootstrapWaitTime = 1000 * 8;

const deployByPrivateApi = async (param: { browser: puppeteer.Browser; url: string; codeTitle: string; sourceCode: string }) => {
  const context = await getFullPermissionBrowserContext(param.browser, config.origin);
  const page = await getConfiguredPage(context);

  // wait for react bootstrapped
  await page.goto(param.url);
  await page.waitFor(applicationBootstrapWaitTime);

  // load scripts to use private-api
  await loadBrowserJavaScript(page);
  // update script text
  await updateScriptText(page, param.codeTitle, param.sourceCode);
};

export const deployCssAndScriptForProject = async (browser: puppeteer.Browser, settings: Config['projects'][number]) => {
  const updating: Promise<any>[] = [];

  if (settings.userScript) {
    updating.push(
      deployByPrivateApi({
        browser,
        url: getUserPageUrl(settings),
        codeTitle: userScriptCodeTitle,
        sourceCode: await loadSourceCode(settings.userScript),
      }),
    );
  }
  if (settings.userCSS) {
    updating.push(
      deployByPrivateApi({
        browser,
        url: getSettingsPageUrl(settings),
        codeTitle: userCssCodeTitle,
        sourceCode: await loadSourceCode(settings.userCSS),
      }),
    );
  }

  return Promise.all(updating);
};
