import { getFormattedDateString, getFormattedTimeString, getTimeText, getDateText, scrapboxCustomFormat } from './datetime-operations';

describe('datetime-operations', () => {
  describe('getFormattedDateString', () => {
    it('should make expected string', () => {
      expect(getFormattedDateString(new Date('2019-12-31T12:30:00'))).toBe('2019/12/31');
      expect(getFormattedDateString(new Date('2019-01-01T00:00:00'))).toBe('2019/01/01');
    });
  });

  describe('getDateText', () => {
    it('should get string', () => {
      expect(getDateText()).toMatch(scrapboxCustomFormat.date);
    });
  });

  describe('getFormattedTimeString', () => {
    it('should make expected string', () => {
      expect(getFormattedTimeString(new Date('2019-12-31T13:10:00'))).toBe('13:00');
      expect(getFormattedTimeString(new Date('2019-01-01T00:30:00'))).toBe('00:30');
    });
  });

  describe('getTimeText', () => {
    it('should get string', () => {
      expect(getTimeText()).toMatch(scrapboxCustomFormat.time);
    });
  });
});
