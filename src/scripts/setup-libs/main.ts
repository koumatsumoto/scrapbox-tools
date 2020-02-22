import { getPrivateApi } from '../../libs/scrapbox';

const setupApi = async () => {
  const api = await getPrivateApi();

  // to debug
  (window as any)['api'] = api;
};

export const setupLibs = async () => {
  await setupApi();
};
