import { Subject } from 'rxjs';
import { createTestingPartialDeviceOrientation } from '../../test-helpers';
import { DeviceOrientation } from '../../types';
import { extract, onlyEntire, roundDecimal } from './rx-operators';

describe('rx-operators', () => {
  describe('extract', () => {
    it('should make expected data', (done: Function) => {
      const $ = new Subject<DeviceOrientationEvent>();
      const orientation = createTestingPartialDeviceOrientation();

      setTimeout(() => {
        $.next({
          ...orientation,
          shouldBeStriped: '',
        } as any);
      });

      $.pipe(extract()).subscribe((data) => {
        expect(data).toEqual(orientation);
        done();
      });
    });
  });

  describe('onlyEntire', () => {
    it('should make expected data', (done: Function) => {
      const $ = new Subject<DeviceOrientationEvent>();
      const ignored = createTestingPartialDeviceOrientation({ alpha: null }) as DeviceOrientationEvent;
      const passed = createTestingPartialDeviceOrientation({ alpha: 0 }) as DeviceOrientationEvent;

      setTimeout(() => {
        $.next(ignored);
        $.next(passed);
      });

      $.pipe(onlyEntire()).subscribe((data) => {
        expect(data).toEqual(passed);
        done();
      });
    });
  });

  describe('roundDecimal', () => {
    it('should make expected data', (done: Function) => {
      const $ = new Subject<DeviceOrientation>();

      setTimeout(() => {
        $.next({
          absolute: true,
          alpha: 0.999,
          beta: 1.0,
          gamma: 1.001,
        });
      });

      $.pipe(roundDecimal()).subscribe((data) => {
        expect(data).toEqual({
          absolute: true,
          alpha: 1,
          beta: 1,
          gamma: 1,
        });
        done();
      });
    });
  });
});
