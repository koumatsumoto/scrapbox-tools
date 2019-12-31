import { getOrientationAndMotionStream } from './get-orientation-and-motion-stream';
import { Subject } from 'rxjs';
import { DeviceMotionAsTuple, DeviceOrientation } from './types';
import { doNextTick } from './test-helpers';

describe('getOrientationAndMotionStream', () => {
  it('should emit values as expected', () => {
    const orientation$ = new Subject<DeviceOrientation>();
    const motion$ = new Subject<DeviceMotionAsTuple>();
    const $ = getOrientationAndMotionStream(orientation$, motion$);

    const vo = {
      absolute: false,
      alpha: 0,
      beta: 0,
      gamma: 0,
    };
    const vm = {
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
    } as DeviceMotionAsTuple;

    doNextTick(() => {
      orientation$.next(vo);
      motion$.next(vm);
    });

    $.subscribe((data) => {
      expect(data).toEqual({
        orientation: vo,
        acceleration: vm.acceleration,
        accelerationIncludingGravity: vm.accelerationIncludingGravity,
        rotationRate: vm.rotationRate,
      });
    });
  });
});
