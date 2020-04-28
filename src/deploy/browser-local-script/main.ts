/**
 * scripts to enable private-api in browser context
 */
import { waitUntil } from '../../libs/common';
import { getApiManager } from '../../libs/scrapbox/private-api';
import { findNextLineId, runOnScrapboxReady } from '../../libs/scrapbox/public-api';
import { MyScripts } from './global-type';

const main = async () => {
  (window as any).waitForMyScriptsReady = async (): Promise<MyScripts> => {
    const checkInterval = 100;
    const timeout = 1000 * 10;

    await waitUntil(() => !!window.__myScripts, checkInterval, timeout);

    return window.__myScripts!;
  };

  runOnScrapboxReady(async () => {
    console.log('[deploy] runOnScrapboxReady');
    // setup server connection
    const api = await getApiManager();
    console.log('[deploy] api is ready');

    // setup global context
    window.__myScripts = {
      updateSourceCode: async (codeName: string, newSourceCode: string) => {
        try {
          const lineId = findNextLineId(codeName);

          // update existing
          if (lineId) {
            console.log('[deploy] start to try update the line of source code');
            await api.changeLineOfCurrentPage({ type: 'update', id: lineId, text: newSourceCode });
            console.log('[deploy] complete updation');
          } else {
            // TODO: implement creation
            throw new Error('Creation is currently not supported, create manually code block before deploy');
          }
        } catch (e) {
          console.error('[deploy] error in updation: ', e.message);
        }
      },
    };
  });
};

main()
  .then(() => {
    console.log('[deploy] scripts executed and start preparation, run `waitForMyScriptsReady()` to check status');
  })
  .catch(console.error);
