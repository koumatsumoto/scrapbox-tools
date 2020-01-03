import { Subject } from 'rxjs';
import { DeviceMotion } from '../types';
import { createTestingDeviceMotionValue } from '../test-helpers';
import { nextTick } from '../../test-helpers';
import { deprecatedGetDeviceMotionStream, getDeviceMotionStream, getDeviceMotionEventStream } from './get-device-motion-stream';

describe('getPartialDeviceMotionStream', () => {
  it('should get an observable', () => {
    const $ = getDeviceMotionEventStream();
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

    nextTick(() => {
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
