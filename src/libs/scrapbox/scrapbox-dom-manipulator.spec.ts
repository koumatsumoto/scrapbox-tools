import { setupBodyForTest } from '../../test-helpers';
import { getSectionCSSClass, ScrapboxDomManipulator } from './scrapbox-dom-manipulator';

describe('ScrapboxDomManipulator', () => {
  beforeEach(() => {
    setupBodyForTest();
  });

  describe('#getElementOrFail', () => {
    it('should get elements', () => {
      expect(ScrapboxDomManipulator.getTextInput()).toBeInstanceOf(HTMLTextAreaElement);
    });
  });

  describe('#getLines', () => {
    it('should get elements', () => {
      expect(ScrapboxDomManipulator.getLine()).not.toHaveLength(0);
    });
  });

  describe('#getLinesGroupBySectionNumber', () => {
    it('should get grouped lines by section number', () => {
      const sections = ScrapboxDomManipulator.getLinesGroupBySectionNumber();
      expect(sections).not.toHaveLength(0);
      sections.forEach((elements, idx) => {
        const sectionNumber = idx;
        expect(elements).not.toHaveLength(0);
        elements.forEach((e) => expect(e.classList.contains(getSectionCSSClass(sectionNumber))).toBeTruthy);
      });
    });
  });
});
