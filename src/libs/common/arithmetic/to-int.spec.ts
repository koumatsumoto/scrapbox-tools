import { floorToInt, roundToInt } from './to-int';

describe('toInt', () => {
  describe('floorToInt', () => {
    it('should calculate values as expected', () => {
      expect(floorToInt(0.99)).toBe(0);
      expect(floorToInt(1)).toBe(1);
      expect(floorToInt(1.01)).toBe(1);
    });
  });

  describe('roundToInt', () => {
    it('should calculate values as expected', () => {
      expect(roundToInt(0.99)).toBe(1);
      expect(roundToInt(1)).toBe(1);
      expect(roundToInt(1.01)).toBe(1);
    });
  });
});
