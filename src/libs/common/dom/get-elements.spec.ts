import { setupBodyForTest } from '../../../test-helpers';
import { getElementOrFail, getElements } from './get-elements';

describe('getElementOrFail', () => {
  it('should retrieve an element from DOM', () => {
    expect(getElementOrFail('body')).toBeTruthy();
  });

  it('should throw if not found', () => {
    expect(() => getElementOrFail('not-found')).toThrow();
  });
});

describe('getElements', () => {
  beforeEach(() => {
    setupBodyForTest();
  });

  it('should retrieve elements from parent element', () => {
    expect(getElements('body').length).toBe(1);
    expect(getElements('not-found').length).toBe(0);
  });
});
