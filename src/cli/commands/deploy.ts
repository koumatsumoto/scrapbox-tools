import { ScrapboxClient } from '../../scrapbox-client';
import { RestApiClient } from '../../scrapbox-client/rest-api-client/rest-api-client';
import { WebsocketClient } from '../../scrapbox-client/websocket-clinet/websocket-client';
import { loadSourceCode } from '../internal/file-loaders';
import { findNextLineIdOrFail } from '../internal/find';
import { isCSSFile, validateDeployArguments } from '../internal/util';

export const deploy = async ({ page, sourceFilePath, project, token }: { token: string; page: string; project: string; sourceFilePath: string }) => {
  const errors = validateDeployArguments({ token, sourceFilePath, project, page });
  if (errors.length) {
    throw new Error(`ParameterError: ${JSON.stringify(errors)}`);
  }
  const codeBlockLabel = isCSSFile(sourceFilePath) ? 'style.css' : 'script.js';

  const apiClient = new RestApiClient(token);
  const [user, projectData] = await Promise.all([apiClient.getMe(), apiClient.getProject(project)]);
  const scrapboxClient = new ScrapboxClient(user, projectData, new RestApiClient(token), new WebsocketClient({ token }));

  const sourceCode = await loadSourceCode(sourceFilePath);
  const pageData = await scrapboxClient.getPage(page);

  // NOTE: assuming code-block exists already
  const lineId = findNextLineIdOrFail(codeBlockLabel, pageData.lines);
  // FIXME: bad type assertion
  await scrapboxClient.changeLine(page, { type: 'update', id: lineId, text: sourceCode });
};
