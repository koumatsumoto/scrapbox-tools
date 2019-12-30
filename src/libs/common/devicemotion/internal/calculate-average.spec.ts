import { calculateAverage } from './calculate-average';
import { createTestingDeviceMotionChange as v } from '../test-helpers';

describe('calculateAverage', () => {
  it('should calculate well', () => {
    expect(calculateAverage([v(1), v(2), v(3)])).toEqual(v(2));
  });
});
