import { main } from './main';

describe('/main.ts', () => {
  it('should be executable', () => {
    expect(() => main()).not.toThrow();
  });
});
