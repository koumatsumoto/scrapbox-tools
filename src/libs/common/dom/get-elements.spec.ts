import { setupBodyForTest } from '../../../test-helpers';
import { findElementOrFail, getElements } from './get-elements';

describe('findElementOrFail', () => {
  it('should retrieve an element from DOM', () => {
    expect(findElementOrFail('body')).toBeTruthy();
  });

  it('should throw if not found', () => {
    expect(() => findElementOrFail('not-found')).toThrow();
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
