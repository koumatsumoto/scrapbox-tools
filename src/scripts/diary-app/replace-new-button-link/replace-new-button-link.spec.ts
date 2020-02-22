import { makeLink } from './replace-new-button-link';

describe('makeLink', () => {
  it('should work', () => {
    expect(makeLink('/test-project/new', 'title')).toBe('/test-project/title');
    expect(makeLink('/test-project/new', '2020/02/23')).toBe('/test-project/2020%2F02%2F23');
  });
});
