/**
 * Common variables and functions (Scrapbox loads each scripts into global environment)
 */
import { defineCustomElements } from './components';
import { importRxJS, runOnDocumentReady } from './libs/common';
import { componentManager, enableConsoleButton, highlightTagsInListItem } from './scripts';

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
