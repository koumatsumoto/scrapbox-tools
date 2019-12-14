import { setupWindowScrapbox } from '../../test-helpers';
import { customPageType, getScrapboxPageType } from './getters';

describe('scrapbox getter functions', () => {
  describe('getScrapboxPageType', () => {
    it('should return other', () => {
      setupWindowScrapbox({ layout: 'list' });
      expect(getScrapboxPageType()).toBe(customPageType.other);
    });

    it('should return symbol (by length)', () => {
      setupWindowScrapbox({ layout: 'page', pageTitle: 'any title' });
      expect(getScrapboxPageType()).toBe(customPageType.symbol);
    });

    it('should return symbol (by regex)', () => {
      setupWindowScrapbox({ layout: 'page', pageTitle: 'some title' });
      expect(getScrapboxPageType()).toBe(customPageType.symbol);
    });

    it('should return daily', () => {
      setupWindowScrapbox({ layout: 'page', pageTitle: '2019/12/14' });
      expect(getScrapboxPageType()).toBe(customPageType.diary);
    });
  });
});
