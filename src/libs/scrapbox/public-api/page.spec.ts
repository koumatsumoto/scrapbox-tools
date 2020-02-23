import { endWithEmptyLine, isEmptyPage, isTitleOnlyPage } from './page';

describe('page', () => {
  const lines: any[] = [
    { id: '1', text: 'hello' },
    { id: '2', text: 'world' },
    { id: '3', text: 'hello world' },
  ];

  describe('isEmptyPage', () => {
    it('should work', () => {
      expect(isEmptyPage(lines)).toBe(false);
      expect(isEmptyPage([{ text: 'hello' }] as any)).toBe(false);
      expect(isEmptyPage([{ text: '' }] as any)).toBe(true);
    });
  });

  describe('isTitleOnlyPage', () => {
    it('should work', () => {
      expect(isTitleOnlyPage(lines)).toBe(false);
      expect(isTitleOnlyPage([{ text: 'hello' }] as any)).toBe(true);
      expect(isTitleOnlyPage([{ text: '' }] as any)).toBe(false);
    });
  });

  describe('endWithEmptyLine', () => {
    it('should work', () => {
      expect(endWithEmptyLine(lines)).toBe(false);
      expect(endWithEmptyLine([{ text: '' }] as any)).toBe(true);
      expect(endWithEmptyLine([{ text: 'first' }, { text: '' }] as any)).toBe(true);
    });
  });
});
