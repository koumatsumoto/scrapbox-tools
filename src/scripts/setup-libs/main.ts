import { MyConsoleButton } from '../../components';
import { getPrivateApi } from '../../libs/scrapbox';
import { componentManager } from '../component-manager';

const setupApi = async () => {
  const api = await getPrivateApi();

  // to debug
  (window as any)['api'] = api;

  return api;
};

export const setupLibs = async () => {
  const api = await setupApi();
  const cb = componentManager.getInstance(MyConsoleButton);

  api.requestStatus$.subscribe((state) => {
    switch (state) {
      case 'request start': {
        cb.setIcon('clear');

        break;
      }
      case 'request end': {
        cb.setIcon('apps');

        break;
      }
    }
  });
};
