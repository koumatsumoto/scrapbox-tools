import { getPrivateApi } from '../../libs/scrapbox';

export const enablePrivateApi = async () => {
  // debug
  const api = await getPrivateApi();
  (window as any).api = api;
};
