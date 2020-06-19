// load .env file for development in local
require('dotenv').config();

import { getGlobalScrapboxApi, ScrapboxApi } from '../libs/scrapbox/api';
import { findNextLineId } from '../libs/scrapbox/util';
import { config, settingsPageName, userCssCodeTitle, userScriptCodeTitle } from './config';
import { loadSourceCode } from './file-loaders';

export const updateCode = async (api: ScrapboxApi, pageName: string, targetCodeBlockName: string, newCode: string) => {
  console.log('[sx/deploy] start update page ', pageName);

  const page = await api.getPage(pageName);
  const lineId = findNextLineId(targetCodeBlockName, page.lines);
  if (!lineId) {
    throw new Error('Line not found');
  }
  await api.changeLine(pageName, { type: 'update', id: lineId, text: newCode });
};

export const main = async () => {
  for (const project of config.projects) {
    try {
      console.log('[sx/deploy] start update project: ', project.name);
      const api = await getGlobalScrapboxApi(project.name, config.token);

      if (project.userScript) {
        await updateCode(api, project.user, userScriptCodeTitle, await loadSourceCode(project.userScript));
      }
      if (project.userCSS) {
        await updateCode(api, settingsPageName, userCssCodeTitle, await loadSourceCode(project.userCSS));
      }
    } catch (e) {
      console.error('[sx/deploy] failed to update project: ', project.name, e);
    }
  }
};

main()
  .then(() => {
    console.log('[sx/deploy] completed');
    process.exit();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
