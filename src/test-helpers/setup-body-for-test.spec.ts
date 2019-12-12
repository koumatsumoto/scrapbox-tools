import { setupBodyForTest } from './setup-body-for-test';

describe('setupBodyForTest', () => {
  it('should mutate inner HTML of body', () => {
    expect(document.body.innerHTML).toBe('');
    setupBodyForTest();
    expect(document.body.innerHTML).not.toBe('');
  });
});
