import { concat, Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { findElementOrFail, isScrapboxReady, nodeChange, scrapboxReady } from './internal/util';

export class UserScriptApi {
  private static pageChange: Observable<void>;

  static get data() {
    if (!isScrapboxReady()) {
      throw new Error('window.scrapbox is not set');
    }

    return window.scrapbox;
  }

  static get ready() {
    return scrapboxReady();
  }

  static get update() {
    this.pageChange = this.pageChange || nodeChange(this.pageContainerElement, { childList: true, subtree: true });

    return concat(this.ready, this.pageChange).pipe(
      map(() => this.data),
      share(),
    );
  }

  static get pageContainerElement() {
    return findElementOrFail('#app-container .page');
  }

  static get pageTitle() {
    return this.data.Page.title || '';
  }

  static get pageLines() {
    return this.data.Page.lines || [];
  }

  static get projectName() {
    return this.data.Project.name;
  }
}
