/**
 * Common variables and functions (Scrapbox loads each scripts into global environment)
 */
import { enableConsoleButton, highlightTagsInListItem, useDebugBoard } from './scripts';
import { runOnDocumentReady } from './libs/common';
import { componentManager } from './scripts';
import { defineCustomElements } from './components';

export const main = () =>
  runOnDocumentReady(() => {
    // register custom web components to browser
    defineCustomElements();
    // components will be connect to DOM
    componentManager.setupComponents();

    highlightTagsInListItem();
    useDebugBoard();
    enableConsoleButton();
  });
