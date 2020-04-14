import { findElementOrFail } from '../../../common/dom';

const getAppRoot = () => findElementOrFail('#app-container');

// alias for breaking change for scrapbox.io
type LineElement = HTMLDivElement;

/**
 * Encapsulate scrapbox dom specification and provide method as natural language
 */
export class DomManipulator {
  static getTitleLine() {
    return findElementOrFail<LineElement>('.page .lines .line-title', getAppRoot());
  }

  // contains editor as first-level
  static getPageContainer() {
    return findElementOrFail<LineElement>('.page', getAppRoot());
  }
}
