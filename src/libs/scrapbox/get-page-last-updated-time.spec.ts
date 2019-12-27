import { setupWindowScrapbox, testData } from '../../test-helpers';
import { getPageLastUpdatedTime } from './get-page-last-updated-time';

describe('getPageLastUpdatedTime', () => {
  it('should get last updated time', () => {
    setupWindowScrapbox(testData.settingPage.sample1);
    expect(getPageLastUpdatedTime()).toBe(7);
  });
});
