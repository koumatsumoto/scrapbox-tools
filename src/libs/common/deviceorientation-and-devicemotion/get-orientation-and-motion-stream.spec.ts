import { getOrientationAndMotionStream } from './get-orientation-and-motion-stream';

describe('getOrientationAndMotionStream', () => {
  it('should be callable', () => {
    expect(() => getOrientationAndMotionStream()).not.toThrow();
  });
});
