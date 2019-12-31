import { Subject } from 'rxjs';
import { DeviceMotion, DeviceMotionValue } from '../../types';
import { createTestingDeviceMotion, createTestingDeviceMotionValue } from '../../test-helpers';
import { toAverage, withChange } from './rx-operators';

describe('rx-operators', () => {
  describe('withChange', () => {
    it('should make expected data', (done: Function) => {
      const $ = new Subject<DeviceMotion>();
      const interval = 10;
      const v = (value: number) => createTestingDeviceMotion(value, interval);
      const firstValue = v(10);
      const nextValue = v(30);

      setTimeout(() => {
        $.next(firstValue);
        $.next(nextValue); // change +20
      });

      $.pipe(withChange()).subscribe((data) => {
        expect(data).toEqual({
          change: {
            acceleration: {
              x: 20,
              y: 20,
              z: 20,
            },
            accelerationIncludingGravity: {
              x: 20,
              y: 20,
              z: 20,
            },
            rotationRate: {
              alpha: 20,
              beta: 20,
              gamma: 20,
            },
          },
          data: nextValue,
        });
        done();
      });
    });
  });

  describe('toAverage', () => {
    it('should make expected data', (done: Function) => {
      const $ = new Subject<DeviceMotionValue>();
      const v = createTestingDeviceMotionValue;

      setTimeout(() => {
        $.next(v(10));
        $.next(v(30)); // average is 20
      });

      $.pipe(toAverage(2)).subscribe((data) => {
        expect(data).toEqual(v(20));
        done();
      });
    });
  });
});
