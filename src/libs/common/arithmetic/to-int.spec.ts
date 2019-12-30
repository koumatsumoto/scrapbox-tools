import { toInt } from './to-int';

describe('toInt', () => {
  it('should calculate well', () => {
    expect(toInt(0.99)).toBe(0);
    expect(toInt(1)).toBe(1);
    expect(toInt(1.01)).toBe(1);
  });
});
