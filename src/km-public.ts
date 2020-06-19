/**
 * Common variables and functions (Scrapbox loads each scripts into global environment)
 */
import { runOnScrapboxReady } from './libs/scrapbox/browser-api';
import { applyLoginCSSClass } from './scripts';

export const main = () => {
  runOnScrapboxReady(async () => {
    // add custom css class to body tag
    applyLoginCSSClass();
  });
};

main();
