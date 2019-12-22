import { isEmpty, isEmptyDoubleDimensionalArray } from './is-empty';

describe('isEmpty', () => {
  it('should evaluate based on length', () => {
    expect(isEmpty('')).toBeTruthy();
    expect(isEmpty('has length')).toBeFalsy();
    expect(isEmpty([])).toBeTruthy();
    expect(isEmpty(['item'])).toBeFalsy();
  });
});

describe('isEmptyDoubleDimensionalArray', () => {
  it('should evaluate based on length', () => {
    expect(isEmptyDoubleDimensionalArray([[]])).toBeTruthy();
    expect(isEmptyDoubleDimensionalArray([['item']])).toBeFalsy();
    expect(isEmptyDoubleDimensionalArray([[], ['item']])).toBeFalsy();
  });
});
