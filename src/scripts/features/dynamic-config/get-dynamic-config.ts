import { tryCatch } from 'fp-ts/es6/Option';
import { ConfigObject, isValid, storageKey, syncAndPersist } from './internal';

let dynamicConfigByStorage: ConfigObject | null;
let dynamicConfigByServer: ConfigObject | null;

export const setupByStorage = (w = window) =>
  tryCatch(() => {
    const json = w.localStorage.getItem(storageKey);
    if (json == null) {
      throw new Error('config is not found in storage');
    }

    const config = JSON.parse(json);
    if (!isValid(config)) {
      throw new Error('parsed config object does not have valid schema');
    }

    return (dynamicConfigByStorage = config);
  });

export const setupByServer = async () => {
  const result = await syncAndPersist();
  if (result instanceof Error) {
    console.error('[sx/dynamic-config] Error: ', result);
    throw result;
  } else {
    console.log('[sx/dynamic-config] DynamicConfig is loaded from server', result);
    return (dynamicConfigByServer = result);
  }
};

export const getDynamicConfig = async () => {
  let loading: Promise<ConfigObject> | null = null;
  if (!dynamicConfigByServer) {
    loading = setupByServer().catch();
  } else if (!dynamicConfigByStorage) {
    setupByStorage();
  }

  return dynamicConfigByServer || dynamicConfigByStorage || loading;
};
