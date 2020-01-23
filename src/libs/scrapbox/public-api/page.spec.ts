import { hasEmptyEOF, isEmptyPage } from './page';

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

  describe('hasEmptyEOF', () => {
    it('should work', () => {
      expect(hasEmptyEOF(lines)).toBe(false);
      expect(hasEmptyEOF([{ text: '' }] as any)).toBe(true);
      expect(hasEmptyEOF([{ text: 'first' }, { text: '' }] as any)).toBe(true);
    });
  });
});
