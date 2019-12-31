import { deprecatedGetDeviceMotionStream, getDeviceMotionStream, getPartialDeviceMotionStream } from './get-device-motion-stream';
import { Subject } from 'rxjs';
import { DeviceMotion } from '../types';
import { createTestingDeviceMotionValue, doNextTick } from '../test-helpers';

describe('getPartialDeviceMotionStream', () => {
  it('should get an observable', () => {
    const $ = getPartialDeviceMotionStream();
    expect(typeof $.subscribe).toBe('function');
    expect(typeof $.pipe).toBe('function');
  });
});

describe('getDeviceMotionStream', () => {
  it('should be callable', () => {
    expect(() => getDeviceMotionStream()).not.toThrow();
  });
});

describe('getDeviceMotionStream', () => {
  it('should emit expected value', (done: Function) => {
    const $ = new Subject<DeviceMotion>();

    doNextTick(() => {
      const interval = 10;
      const v = (val: number) => ({ ...createTestingDeviceMotionValue(val), interval });
      // averaged
      $.next(v(20));
      $.next(v(30)); // average 30
    });

    deprecatedGetDeviceMotionStream(
      {
        precision: 0,
      },
      $.asObservable(),
    ).subscribe((data) => {
      // debug purpose
      expect(data).toBeTruthy();
      done();
    });
  });
});
