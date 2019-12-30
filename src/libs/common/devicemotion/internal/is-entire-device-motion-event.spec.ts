import { createTestingDeviceMotionData } from '../test-helpers';
import { isEntireDeviceMotionData } from './is-entire-device-motion-data';

describe('isEntireDeviceMotionEvent', () => {
  it('should cond', () => {
    const i = isEntireDeviceMotionData;
    const c = createTestingDeviceMotionData;
    expect(i(c())).toBeTruthy();
    expect(i(c({ acceleration: { x: null } }))).toBeFalsy();
    expect(i(c({ acceleration: { y: null } }))).toBeFalsy();
    expect(i(c({ acceleration: { z: null } }))).toBeFalsy();
    expect(i(c({ accelerationIncludingGravity: { x: null } }))).toBeFalsy();
    expect(i(c({ accelerationIncludingGravity: { y: null } }))).toBeFalsy();
    expect(i(c({ accelerationIncludingGravity: { z: null } }))).toBeFalsy();
    expect(i(c({ rotationRate: { alpha: null } }))).toBeFalsy();
    expect(i(c({ rotationRate: { beta: null } }))).toBeFalsy();
    expect(i(c({ rotationRate: { gamma: null } }))).toBeFalsy();
  });
});
