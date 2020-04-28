/**
 * Common variables and functions (Scrapbox loads each scripts into global environment)
 */
import { runOnScrapboxReady } from './libs/scrapbox/public-api';
import { addDatetimeOnListItem, applyLoginCSSClass } from './scripts';

export const main = () => {
  runOnScrapboxReady(async () => {
    // add custom css class to body tag
    applyLoginCSSClass();
    // display datetime on list-item
    addDatetimeOnListItem();
  });
};

main();
