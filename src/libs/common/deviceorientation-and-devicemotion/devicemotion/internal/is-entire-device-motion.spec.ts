import { createTestingPartialDeviceMotion } from '../../test-helpers';
import { isEntireDeviceMotion } from './is-entire-device-motion';

describe('isEntireDeviceMotion', () => {
  it('should cond', () => {
    const i = isEntireDeviceMotion;
    const c = createTestingPartialDeviceMotion;
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
