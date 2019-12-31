import { getDeviceMotionDataStream, getPartialDeviceMotionStream } from './get-device-motion-stream';
import { Subject } from 'rxjs';
import { DeviceMotion } from './types';
import { createTestingDeviceMotionValue, doNextTick } from './test-helpers';

describe('getPartialDeviceMotionStream', () => {
  it('should get an observable', () => {
    const $ = getPartialDeviceMotionStream();
    expect(typeof $.subscribe).toBe('function');
    expect(typeof $.pipe).toBe('function');
  });
});

describe('getDeviceMotionDataStream', () => {
  it('should emit expected value', (done: Function) => {
    const $ = new Subject<DeviceMotion>();

    doNextTick(() => {
      const interval = 10;
      const v = (val: number) => ({ ...createTestingDeviceMotionValue(val), interval });
      // averaged
      $.next(v(10));
      $.next(v(30)); // average 20
      // averaged
      $.next(v(10));
      $.next(v(50)); // average 30
    });

    getDeviceMotionDataStream(
      {
        averageDenominator: 2,
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
