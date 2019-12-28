/**
 * Common variables and functions (Scrapbox loads each scripts into global environment)
 */
import { copyTagText, highlightTagsInListItem } from './scripts';
import { appendConsoleButton, defineCustomElements } from './components';
import { runOnDocumentReady } from './libs/common';

export const main = () =>
  runOnDocumentReady(() => {
    // define and construct custom elements
    defineCustomElements();
    appendConsoleButton();

    highlightTagsInListItem();
    copyTagText();
  });
