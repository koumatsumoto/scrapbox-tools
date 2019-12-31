import { toInt } from './to-int';

describe('toInt', () => {
  it('should calculate values as expected', () => {
    expect(
      toInt({
        acceleration: {
          x: 0.00001,
          y: 0.0001,
          z: 0.001,
        },
        accelerationIncludingGravity: {
          x: 0.01,
          y: 0.1,
          z: 0,
        },
        rotationRate: {
          alpha: 1,
          beta: 10,
          gamma: 100,
        },
        interval: 0,
      }),
    ).toEqual({
      acceleration: {
        x: 1000,
        y: 10000,
        z: 100000,
      },
      accelerationIncludingGravity: {
        x: 1000000,
        y: 10000000,
        z: 0,
      },
      interval: 0,
      rotationRate: {
        alpha: 100000000,
        beta: 1000000000,
        gamma: 10000000000,
      },
    });
  });
});
