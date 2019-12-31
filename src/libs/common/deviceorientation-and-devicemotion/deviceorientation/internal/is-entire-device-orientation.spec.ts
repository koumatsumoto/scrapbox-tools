import { createTestingPartialDeviceOrientation } from '../../test-helpers';
import { isEntireDeviceOrientation } from './is-entire-device-orientation';

describe('isEntireDeviceOrientation', () => {
  it('should cond', () => {
    const i = isEntireDeviceOrientation;
    const c = createTestingPartialDeviceOrientation;
    expect(i(c())).toBeTruthy();
    expect(i(c({ alpha: null }))).toBeFalsy();
    expect(i(c({ beta: null }))).toBeFalsy();
    expect(i(c({ gamma: null }))).toBeFalsy();
  });
});
