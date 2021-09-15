import { isObject, tail } from 'lodash-es';
import { firstValueFrom, ReplaySubject } from 'rxjs';
import { ScrapboxApi } from '../api';
import { UserScriptApi } from '../user-script';

type ConfigObject = Record<string, unknown>;
const fallback: ConfigObject = {};

export class DynamicConfig {
  private data$ = new ReplaySubject<ConfigObject>(1);

  get data() {
    return firstValueFrom(this.data$);
  }

  constructor(private readonly api: ScrapboxApi) {
    this.loadConfig().catch(console.error);
  }

  async loadConfig() {
    try {
      const page = await this.api.getPage(UserScriptApi.projectName, 'config');
      const text = tail(page.lines)
        .map((line) => line.text)
        .join('');
      const config = JSON.parse(text);
      this.data$.next(isObject(config) ? (config as ConfigObject) : fallback);
    } catch (e) {
      console.error(e);
      this.data$.next({});
    }

    return this.data;
  }
}
