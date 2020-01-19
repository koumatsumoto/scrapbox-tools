/**
 * to enable private-api in browser context
 */
import { getPrivateApi } from '../../libs/scrapbox/private-api';
import { findNextLineId, runOnScrapboxReady } from '../../libs/scrapbox/public-api';

type MyScripts = {
  updateSourceCode: (codeName: string, newSourceCode: string) => Promise<void>;
};

// extensions
declare global {
  interface Window {
    waitForMyScriptsReady: () => Promise<void>;
    __myScripts?: MyScripts;
  }
}

const main = async () => {
  (window as any).waitForMyScriptsReady = () => {
    return new Promise<MyScripts>((resolve, reject) => {
      const id = window.setInterval(() => {
        if (window.__myScripts) {
          window.clearInterval(id);
          resolve(window.__myScripts);
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
