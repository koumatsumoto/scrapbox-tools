import { DoubleDimensionalArray } from '../../types';
import { getElementOrFail, getElements } from '../common';
import { config } from './config';
import { selectors } from './selectors';

const sectionCSSClassPrefix = 'section-';
export const getSectionCSSClass = (num: number) => `${sectionCSSClassPrefix}${num}`;
type Sections = DoubleDimensionalArray<Element>;

export class ScrapboxDomManipulator {
  static getTextInput() {
    return getElementOrFail<HTMLTextAreaElement>(config.textareaSelector);
  }

  static pasteToEditor() {
    const textarea = this.getTextInput();
    textarea.click();
    const success = document.execCommand('paste');
    if (!success) {
      alert('failed to paste');
    }
  }

  static getLine() {
    return getElements(selectors.linesInPage);
  }

  static getLinesGroupBySectionNumber(): Sections {
    const sections: Sections = [[]];
    let sectionNumber = 0;

    for (const line of this.getLine()) {
      // section number is incremented after blank line
      if (!line.classList.contains(getSectionCSSClass(sectionNumber))) {
        sectionNumber++;
        sections[sectionNumber] = [];
      }

      sections[sectionNumber].push(line);
    }

    return sections;
  }
}
