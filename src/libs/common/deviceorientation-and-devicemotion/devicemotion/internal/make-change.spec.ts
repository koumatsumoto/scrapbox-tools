import { calculateMotionChange, getChangePerMillisecond } from './make-change';

describe('calculateMotionChange', () => {
  it('should calculate values as expected', () => {
    expect(
      calculateMotionChange(
        {
          acceleration: {
            x: 0,
            y: 0,
            z: 0,
          },
          accelerationIncludingGravity: {
            x: 0,
            y: 0,
            z: 0,
          },
          rotationRate: {
            alpha: 0,
            beta: 0,
            gamma: 0,
          },
        },
        {
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
        },
      ),
    ).toEqual({
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
    });
  });
});

describe('getChangePerMillisecond', () => {
  it('should calculate values as expected', () => {
    expect(
      getChangePerMillisecond(
        {
          acceleration: {
            x: 0,
            y: 0,
            z: 0,
          },
          accelerationIncludingGravity: {
            x: 0,
            y: 0,
            z: 0,
          },
          rotationRate: {
            alpha: 0,
            beta: 0,
            gamma: 0,
          },
          interval: 10,
        },
        {
          acceleration: {
            x: 10,
            y: 20,
            z: 30,
          },
          accelerationIncludingGravity: {
            x: 40,
            y: 50,
            z: 60,
          },
          rotationRate: {
            alpha: 70,
            beta: 80,
            gamma: 90,
          },
          interval: 10,
        },
      ),
    ).toEqual({
      acceleration: {
        x: 1,
        y: 2,
        z: 3,
      },
      accelerationIncludingGravity: {
        x: 4,
        y: 5,
        z: 6,
      },
      rotationRate: {
        alpha: 7,
        beta: 8,
        gamma: 9,
      },
    });
  });
});
