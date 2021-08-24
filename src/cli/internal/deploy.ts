import { ScrapboxApi } from '../../libs/scrapbox-api';
import { loadSourceCode } from './file-loaders';
import { findNextLineIdOrFail } from './find';
import { isCSSFile, validateDeployArguments } from './util';

export const deploy = async ({ page, sourceFilePath, project, token }: { token: string; page: string; project: string; sourceFilePath: string }) => {
  const errors = validateDeployArguments({ token, sourceFilePath, project, page });
  if (errors.length) {
    throw new Error(`ParameterError: ${JSON.stringify(errors)}`);
  }

  const codeBlockLabel = isCSSFile(sourceFilePath) ? 'style.css' : 'script.js';
  const sourceCode = await loadSourceCode(sourceFilePath);

  const scrapboxClient = new ScrapboxApi(token);
  const pageData = await scrapboxClient.getPage(project, page);

  // NOTE: assuming code-block exists already
  const lineId = findNextLineIdOrFail(codeBlockLabel, pageData.lines);
  // FIXME: bad type assertion
  await scrapboxClient.changeLine(project, page, { type: 'update', id: lineId, text: sourceCode });
};
