import { none } from 'fp-ts/es6/Option';
import { setupBodyForTest } from '../../../test-helpers';
import { findElement, findElementOrFail, findElements } from './find-elements';

describe('findElementOrFail', () => {
  it('should retrieve an element from DOM', () => {
    expect(findElementOrFail('body')).toBeTruthy();
  });

  it('should throw if not found', () => {
    expect(() => findElementOrFail('not-found')).toThrow();
  });
});

describe('findElement', () => {
  it('should retrieve an element from DOM', () => {
    expect(findElement('body')).toBeTruthy();
  });

  it('should throw if not found', () => {
    expect(findElement('not-found')).toBe(none);
  });
});

describe('findElements', () => {
  beforeEach(() => {
    setupBodyForTest();
  });

  it('should retrieve elements from parent element', () => {
    expect(findElements('body').length).toBe(1);
    expect(findElements('not-found').length).toBe(0);
  });
});
