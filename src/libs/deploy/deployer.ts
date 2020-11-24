import { getScrapboxClient } from '../scrapbox-client';
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

    try {
      const client = await getScrapboxClient({ projectName: this.projectName, token: this.token });
      const sourceCode = await loadSourceCode(config.sourceFilePath);
      const page = await client.getPage(config.targetPageName);

      // NOTE: assuming code-block exists already
      const lineId = findNextLineIdOrFail(config.codeBlockLabel, page.lines);
      // FIXME: bad type assertion
      await client.changeLine(config.targetPageName, { type: 'update', id: lineId, text: sourceCode });

      console.log(`[scrapbox-tools/deploy] task completed: ${taskName}`);
    } catch (e) {
      console.error('[scrapbox-tools/deploy] script errored ', e);
      throw e;
    }
  }
}
