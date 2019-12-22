import { addClass } from './add-class';

describe('addClass', () => {
  const className = 'my-class';
  const createElement = () => document.createElement('div');

  it('should add class to one', () => {
    const e = createElement();
    expect(e.classList.contains(className)).toBeFalsy();
    addClass(e, className);
    expect(e.classList.contains(className)).toBeTruthy();
  });

  it('should add class to one', () => {
    const es = [createElement(), createElement()];
    es.forEach((e) => expect(e.classList.contains(className)).toBeFalsy());
    addClass(es, className);
    es.forEach((e) => expect(e.classList.contains(className)).toBeTruthy());
  });
});
