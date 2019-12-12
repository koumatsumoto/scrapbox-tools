import { DoubleDimensionalArray } from '../../types';
import { getElements } from '../common';
import { selectors } from './selectors';

const sectionCSSClassPrefix = 'section-';
export const getSectionCSSClass = (num: number) => `${sectionCSSClassPrefix}${num}`;
type Sections = DoubleDimensionalArray<Element>;

export class ScrapboxDomManipulator {
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
