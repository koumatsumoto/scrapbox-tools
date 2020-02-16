import { makeTag } from './tag';

describe('tag operations', () => {
  describe('makeTag', () => {
    it('should make values as expected', () => {
      expect(makeTag('')).toBe('');
      expect(makeTag('tag')).toBe('#tag');
      expect(makeTag('#tag')).toBe('#tag');
    });
  });
});
