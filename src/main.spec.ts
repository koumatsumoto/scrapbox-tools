import { main } from './main';
import { setupWindowScrapbox } from './test-helpers';

describe('/main.ts', () => {
  beforeAll(() => {
    setupWindowScrapbox();
  });

  it('should be executable', () => {
    expect(() => main()).not.toThrow();
  });
});
