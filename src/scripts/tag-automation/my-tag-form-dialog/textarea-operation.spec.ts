import { addWord, joinWords, removeWord, splitWords } from './textarea-operation';

describe('textarea operation', () => {
  describe('splitWords', () => {
    it('should work', () => {
      expect(splitWords('a b c')).toEqual(['a', 'b', 'c']);
      expect(splitWords(' a b  c ')).toEqual(['a', 'b', 'c']);
      expect(splitWords(' a b　c ')).toEqual(['a', 'b', 'c']); // full-width space
    });
  });

  describe('joinWords', () => {
    it('should work', () => {
      expect(joinWords(['a'])).toEqual('a');
      expect(joinWords(['a', 'b', 'c'])).toEqual('a b c');
    });
  });

  describe('addWord', () => {
    it('should add new word', () => {
      const textarea = { value: 'a b' };
      addWord('c', textarea);

      expect(textarea.value).toBe('a b c');
    });

    it('should not add duplicated word', () => {
      const textarea = { value: 'a b' };
      addWord('b', textarea);

      expect(textarea.value).toBe('a b');
    });
  });

  describe('removeWord', () => {
    it('should remove existing word', () => {
      const textarea = { value: 'a b c' };
      removeWord('a', textarea);

      expect(textarea.value).toBe('b c');
    });

    it('should do nothing if not existing', () => {
      const textarea = { value: 'a b c' };
      removeWord('d', textarea);

      expect(textarea.value).toBe('a b c');
    });
  });
});
