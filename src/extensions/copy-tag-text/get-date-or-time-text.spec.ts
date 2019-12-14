import { setupWindowScrapbox } from '../../test-helpers';
import { scrapboxCustomFormat } from '../../util/scrapbox';
import { getDateOrTimeText } from './get-date-or-time-text';

describe('getDateOrTimeText', () => {
  it('should return time text', () => {
    setupWindowScrapbox({ layout: 'list' });
    expect(getDateOrTimeText()).toMatch(scrapboxCustomFormat.date);
  });

  it('should return date text', () => {
    setupWindowScrapbox({ layout: 'page', pageTitle: '2019/12/14' });
    expect(getDateOrTimeText()).toMatch(scrapboxCustomFormat.time);
  });
});
