import { main } from './index';

describe('index.ts', () => {
  it('should be executable', () => {
    expect(() => main()).not.toThrow();
  });
});
