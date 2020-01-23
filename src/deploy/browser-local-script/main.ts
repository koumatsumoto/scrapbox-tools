/**
 * scripts to enable private-api in browser context
 */
import { waitUntil } from '../../libs/common';
import { getPrivateApi } from '../../libs/scrapbox/private-api';
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

    // connect to websocket
    const api = await getPrivateApi();
    console.log('[deploy] private api is ready');

    // setup global context
    window.__myScripts = {
      updateSourceCode: async (codeName: string, newSourceCode: string) => {
        const lineId = findNextLineId(codeName);

        // update existing
        if (lineId) {
          console.log('[deploy] start to try update the line of source code');
          await api.updateLine({ id: lineId, text: newSourceCode });
          console.log('[deploy] complete updation');
        } else {
          // TODO: implement creation
          throw new Error('Creation is currently not supported, create manually code block before deploy');
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
