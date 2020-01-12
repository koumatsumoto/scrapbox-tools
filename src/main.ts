/**
 * Common variables and functions (Scrapbox loads each scripts into global environment)
 */
import { componentManager, enableConsoleButton, highlightTagsInListItem } from './scripts';
import { importRxJS, runOnDocumentReady } from './libs/common';
import { defineCustomElements } from './components';

export const main = () => {
  runOnDocumentReady(async () => {
    await importRxJS();

    // register custom web components to browser
    defineCustomElements();
    // components will be connect to DOM
    componentManager.setupComponents();

    highlightTagsInListItem();
    enableConsoleButton();
  });
};
