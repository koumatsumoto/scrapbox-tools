import { ID } from '../api-client/common';
import { loadSourceCode } from './internal/file-loaders';
import { getGlobalScrapboxApi } from './internal/setup-api';

export const findIndex = (searchString: string, lines: { text: string }[]) => {
  return lines.findIndex((line) => line.text.includes(searchString));
};
export const findNextLineId = (searchString: string, lines: { id: ID; text: string }[]): ID | null => {
  const index = findIndex(searchString, lines);
  if (index === -1) {
    return null;
  }
  const nextLineOrNone = lines[index + 1];

  return nextLineOrNone ? nextLineOrNone.id : null;
};

export const deploy = async (config: { token: string; projectName: string; targetPageName: string; codeBlockLabel: string; sourceFilePath: string }) => {
  const sourceCode = await loadSourceCode(config.sourceFilePath);
  const api = await getGlobalScrapboxApi(config.projectName, config.token);
  const page = await api.getPage(config.targetPageName);

  // NOTE: assuming code-block exists already
  const lineId = findNextLineId(config.codeBlockLabel, page.lines);
  if (!lineId) {
    throw new Error('Line not found');
  }
  await api.changeLine(config.targetPageName, { type: 'update', id: lineId, text: sourceCode });
};
