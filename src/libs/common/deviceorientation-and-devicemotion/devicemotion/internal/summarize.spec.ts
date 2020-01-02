import { createTestingDeviceMotionValue } from '../../test-helpers';
import { summarizeMotions } from './summarize';

describe('summarizeMotions', () => {
  it('should return null if empty array', () => {
    expect(summarizeMotions([])).toBe(null);
  });

  it('should calculate values as expected (length eq 1)', () => {
    const v = createTestingDeviceMotionValue;
    const expected = {
      avg: 1,
      max: 1,
      min: 1,
    };

    expect(summarizeMotions([v(1)])).toEqual({
      acceleration: {
        x: expected,
        y: expected,
        z: expected,
      },
      accelerationIncludingGravity: {
        x: expected,
        y: expected,
        z: expected,
      },
      rotationRate: {
        alpha: expected,
        beta: expected,
        gamma: expected,
      },
    });
  });

  it('should calculate values as expected (length gt 1)', () => {
    const v = createTestingDeviceMotionValue;
    const expected = {
      avg: 3,
      max: 5,
      min: 1,
    };

    expect(summarizeMotions([v(1), v(5)])).toEqual({
      acceleration: {
        x: expected,
        y: expected,
        z: expected,
      },
      accelerationIncludingGravity: {
        x: expected,
        y: expected,
        z: expected,
      },
      rotationRate: {
        alpha: expected,
        beta: expected,
        gamma: expected,
      },
    });
  });
});
