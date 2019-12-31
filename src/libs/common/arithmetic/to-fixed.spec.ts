import { toFixed } from './to-fixed';

describe('toFixed', () => {
  it('should calculate value', () => {
    expect(toFixed(1.1, 0)).toBe(1);
    expect(toFixed(1.9, 0)).toBe(2);
    expect(toFixed(10, 1)).toBe(10);
  });
});
