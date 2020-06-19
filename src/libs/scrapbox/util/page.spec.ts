import { findLineId, findIndex, findNextLineId, isEmptyLine } from './page';

describe('line', () => {
  const lines: any[] = [
    { id: '1', text: 'hello' },
    { id: '2', text: 'world' },
    { id: '3', text: 'hello world' },
  ];

  describe('findLineIndex', () => {
    it('should work', () => {
      expect(findIndex('hell', lines)).toBe(0);
      expect(findIndex('hello', lines)).toBe(0);
      expect(findIndex('hello world', lines)).toBe(2);
      expect(findIndex('not found', lines)).toBe(-1);
    });
  });

  describe('findLineId', () => {
    it('should work', () => {
      expect(findLineId('hell', lines)).toBe('1');
      expect(findLineId('hello', lines)).toBe('1');
      expect(findLineId('hello world', lines)).toBe('3');
      expect(findLineId('not found', lines)).toBe(null);
    });
  });

  describe('findNextLineId', () => {
    it('should work', () => {
      expect(findNextLineId('hell', lines)).toBe('2');
      expect(findNextLineId('hello', lines)).toBe('2');
      expect(findNextLineId('hello world', lines)).toBe(null);
      expect(findNextLineId('not found', lines)).toBe(null);
    });
  });

  describe('isEmptyLine', () => {
    it('should work', () => {
      expect(isEmptyLine({ text: '' } as any)).toBe(true);
      expect(isEmptyLine({ text: 'hello' } as any)).toBe(false);
    });
  });
});
