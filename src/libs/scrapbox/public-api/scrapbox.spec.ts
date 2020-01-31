import { changeRoute } from './scrapbox';

describe('scrap box public api', () => {
  describe('changeRoute', () => {
    it('should push state', () => {
      const pushState = jest.fn();
      (window as any).history.pushState = pushState;

      changeRoute('new-title', { Project: { name: 'project-name' } } as any);

      expect(pushState).toBeCalledWith({ path: '/project-name/new-title' }, 'new-title');
    });
  });
});
