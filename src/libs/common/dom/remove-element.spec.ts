import { setupBodyForTest } from '../../../test-helpers';
import { removeElement } from './remove-element';

describe('removeElement', () => {
  beforeEach(() => {
    setupBodyForTest();
  });

  it('should remove an element', () => {
    const element = document.createElement('DIV');
    element.id = 'test-element';
    document.body.appendChild(element);

    expect(document.querySelector(`#${element.id}`)).toBeTruthy();
    expect(() => removeElement(element)).not.toThrow();
    expect(document.querySelector(`#${element.id}`)).toBeFalsy();
  });

  it('should throw if element not appended to DOM', () => {
    const element = document.createElement('DIV');
    element.id = 'test-element';
    expect(() => removeElement(element)).toThrow();
  });
});
