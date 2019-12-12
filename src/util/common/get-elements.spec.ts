import { setupBodyForTest } from '../../test-helpers';
import { getElements } from './get-elements';

describe('getElements', () => {
  beforeEach(() => {
    setupBodyForTest();
  });

  it('should retrieve elements from DOM', () => {
    expect(getElements('body').length).toBe(1);
  });
});
