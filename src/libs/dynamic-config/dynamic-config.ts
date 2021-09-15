import { firstValueFrom, ReplaySubject } from 'rxjs';
import { ScrapboxApi } from '../api';
import { UserScriptApi } from '../user-script';

const concatPageLines = (lines: { text: string }[]): string => {
  const [, ...contentsLines] = lines; // drop first title line

  return contentsLines.map(({ text }) => text).join('');
};

export class DynamicConfig {
  private data$ = new ReplaySubject<Record<string, unknown>>(1);

  get data() {
    return firstValueFrom(this.data$);
  }

  constructor(private readonly api: ScrapboxApi) {
    this.#loadConfig().catch(console.error);
  }

  async #loadConfig() {
    let config = {};

    try {
      const page = await this.api.getPage(UserScriptApi.projectName, 'config');
      const json = concatPageLines(page.lines);
      config = JSON.parse(json);
    } catch (e) {
      console.error(e);
    }

    this.data$.next({ ...config });
  }
}
