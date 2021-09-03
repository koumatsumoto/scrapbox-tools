import { isResponseMessageOf } from './message';

test('isResponseMessageOf', () => {
  const response = { packetType: '431', data: [] };

  expect(isResponseMessageOf('1')(response)).toBeTruthy();
  expect(isResponseMessageOf('10')(response)).toBeFalsy();
  expect(isResponseMessageOf('')(response)).toBeFalsy();
});
