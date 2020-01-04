import { within } from './within';

describe('within', () => {
  it('should work', () => {
    expect(within(-2, -1, 2)).toBe(false);
    expect(within(-1, -1, 2)).toBe(true);
    expect(within(0, -1, 2)).toBe(true);
    expect(within(1, -1, 2)).toBe(true);
    expect(within(2, -1, 2)).toBe(true);
    expect(within(3, -1, 2)).toBe(false);
    expect(() => within(1, 3, 2)).toThrow();
  });
});
