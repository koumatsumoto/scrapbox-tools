/**
 * scripts to enable private-api in browser context
 */
import './global-type';
import { getPrivateApi } from '../../libs/scrapbox/private-api';
import { findNextLineId, runOnScrapboxReady } from '../../libs/scrapbox/public-api';

const main = async () => {
  (window as any).waitForMyScriptsReady = () => {
    return new Promise<void>((resolve, reject) => {
      const id = window.setInterval(() => {
        if (window.__myScripts) {
          window.clearInterval(id);
          resolve();
        }
      }, 100);

      // timeout for wait
      setTimeout(reject, 1000 * 10);
    });
  };

  runOnScrapboxReady(async () => {
    const api = await getPrivateApi();
    const updateSourceCode = async (codeName: string, newSourceCode: string) => {
      const lineId = findNextLineId(codeName);

      // update existing
      if (lineId) {
        await api.updateSingleLineOfCurrentPage({ lineId, text: newSourceCode });
      } else {
        // TODO: implement creation
        throw new Error('Creation is currently not supported, create manually code block before deploy');
      }
    };

    // enable to use global context
    window.__myScripts = { updateSourceCode };
  });
};

main()
  .then(() => {
    console.log('[deploy] scripts executed and start preparation, run `waitForMyScriptsReady()` to check status');
  })
  .catch(console.error);
