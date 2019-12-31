import { makeReadableTextContent } from './make-readable-text-content';

const expectedString = `
orientation: {
  absolute: false,
  alpha: 0,
  beta: 0,
  gamma: 0,
}
acceleration: {
  x: [0, 0]
  y: [0, 0]
  z: [0, 0]
}
rotationRate: {
  alpha: [0, 0],
  beta: [0, 0],
  gamma: [0, 0],
}
`.trim();

describe('makeReadableTextContent', () => {
  it('should make expected string', () => {
    expect(
      makeReadableTextContent({
        orientation: {
          absolute: false,
          alpha: 0,
          beta: 0,
          gamma: 0,
        },
        acceleration: {
          x: [0, 0],
          y: [0, 0],
          z: [0, 0],
        },
        accelerationIncludingGravity: {
          x: [0, 0],
          y: [0, 0],
          z: [0, 0],
        },
        rotationRate: {
          alpha: [0, 0],
          beta: [0, 0],
          gamma: [0, 0],
        },
      }),
    ).toBe(expectedString);
  });
});
