/**
 * Common variables and functions (Scrapbox loads each scripts into global environment)
 */
import { applyNonIndentedTextClass } from './scripts/apply-non-indented-text-class';
import { applyTimeTextClass } from './scripts/apply-time-text-class';
import { copyTagText } from './scripts/copy-tag-text';
import { trimHashAndAddClassToTagsInListItems } from './scripts/trim-hash-and-add-class-to-tags-in-list-items';
import { appendConsoleButton, defineCustomElements } from './components';
import { runOnDocumentReady } from './libs/common';

export const main = () =>
  runOnDocumentReady(() => {
    // define and construct custom elements
    defineCustomElements();
    appendConsoleButton();

    applyTimeTextClass();
    applyNonIndentedTextClass();
    trimHashAndAddClassToTagsInListItems();
    copyTagText();
    console.log('[scripts] loaded');
  });
