/**
 * Common variables and functions (Scrapbox loads each scripts into global environment)
 */
import { importRxJS } from './libs/common';
import { runOnScrapboxReady } from './libs/scrapbox/public-api';
import { applyLoginCSSClass } from './scripts';

export const main = () => {
  runOnScrapboxReady(async () => {
    await importRxJS();

    // add custom css class to body tag
    applyLoginCSSClass();
  });
};

main();
