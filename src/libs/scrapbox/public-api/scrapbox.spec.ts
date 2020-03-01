import { changeRoute, getFirstLineOrFail, getPageIdMap, getPageTitleMap } from './scrapbox';

describe('scrap box public api', () => {
  describe('getFirstLineOrFail', () => {
    it('should get first line', () => {
      const first = {};
      expect(
        getFirstLineOrFail({
          Page: { lines: [first] },
        } as any),
      ).toEqual(first);
    });

    it('should throw if first line not found', () => {
      expect(() =>
        getFirstLineOrFail({
          Page: { lines: [] },
        } as any),
      ).toThrow();
    });
  });

  describe('changeRoute', () => {
    it('should push state', () => {
      const pushState = jest.fn();
      (window as any).history.pushState = pushState;

      changeRoute('new-title', { Project: { name: 'project-name' } } as any);

      expect(pushState).toBeCalledWith({ path: '/project-name/new-title' }, 'new-title');
    });
  });

  describe('getPageIdMap', () => {
    it('should work', () => {
      expect(getPageIdMap({ Project: { pages: [{ id: '1', exists: true }, { id: '2' }, { id: '3', exists: true }, {}] } } as any)).toEqual(
        new Map([
          ['1', { id: '1', exists: true }],
          ['3', { id: '3', exists: true }],
        ]),
      );
    });
  });

  describe('getPageTitleMap', () => {
    it('should work', () => {
      expect(getPageTitleMap({ Project: { pages: [{ title: 'hello' }, {}, { title: 'world' }, {}] } } as any)).toEqual(
        new Map([
          ['hello', { title: 'hello' }],
          ['world', { title: 'world' }],
        ]),
      );
    });
  });
});
