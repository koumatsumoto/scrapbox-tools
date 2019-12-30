import { getDeviceMotionWithChangeStream, getDeviceMotionStream } from './get-devicemotion-stream';
import { Subject } from 'rxjs';
import { DeviceMotionData } from './types';
import { createTestingDeviceMotionChange } from './test-helpers';

describe('getDeviceMotionStream', () => {
  it('should get an observable', () => {
    const $ = getDeviceMotionStream();
    expect(typeof $.subscribe).toBe('function');
    expect(typeof $.pipe).toBe('function');
  });
});

describe('getDeviceMotionChangeStream', () => {
  it('should emit calculated value', (done: Function) => {
    const precision = 8;
    const scale = 10000;
    const interval = 10;
    const $ = new Subject<DeviceMotionData>();

    getDeviceMotionWithChangeStream({ precision, scale }, $.asObservable()).subscribe((data) => {
      const average = 5 / interval;
      const equalized = average / scale;
      expect(data).toEqual(createTestingDeviceMotionChange(equalized * 10 ** precision));
      done();
    });

    const v = (val: number) => ({ ...createTestingDeviceMotionChange(val), interval });
    $.next(v(10));
    $.next(v(20)); // change +10
    $.next(v(10)); // change -10
    $.next(v(10)); // change 0
    $.next(v(10)); // change 0
    $.next(v(10)); // change 0
    $.next(v(10)); // change 0
    $.next(v(10)); // change 0
    $.next(v(10)); // change 0
    $.next(v(40)); // change +30
    $.next(v(60)); // change +20
  });
});
