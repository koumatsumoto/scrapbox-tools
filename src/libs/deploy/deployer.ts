import { getScrapboxClient } from '../api-client';
import { loadSourceCode } from './internal/file-loaders';
import { findNextLineIdOrFail } from './internal/find';

export class Deployer {
  constructor(private readonly projectName: string, private readonly token?: string) {}
  async deploy(
    config: Readonly<{
      targetPageName: string;
      codeBlockLabel: string;
      sourceFilePath: string;
    }>,
  ) {
    const taskName = `${this.projectName}/${config.targetPageName}/${config.codeBlockLabel}`;
    console.log(`[scrapbox-tools/deploy] task started: ${taskName}`);
    const client = await getScrapboxClient({ projectName: this.projectName, token: this.token });

    try {
      const sourceCode = await loadSourceCode(config.sourceFilePath);
      const page = await client.getPage(config.targetPageName);

      // NOTE: assuming code-block exists already
      const lineId = findNextLineIdOrFail(config.codeBlockLabel, page.lines);
      // FIXME: bad type assertion
      await client.changeLine(config.targetPageName, { type: 'update', id: lineId, text: sourceCode } as any);
    } catch (e) {
      console.error('[scrapbox-tools/deploy] script errored ', e);
      throw e;
    }
  }
}
