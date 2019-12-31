import { getDeviceOrientationStream } from './get-device-orientation-stream';

describe('getDeviceOrientationStream', () => {
  it('should be callable', () => {
    expect(() => getDeviceOrientationStream()).not.toThrow();
  });
});
