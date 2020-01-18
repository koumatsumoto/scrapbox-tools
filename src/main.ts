/**
 * Common variables and functions (Scrapbox loads each scripts into global environment)
 */
import { defineCustomElements } from './components';
import { importRxJS } from './libs/common';
import { runOnScrapboxReady } from './libs/scrapbox/public-api';
import { applyLoginCSSClass, componentManager, enableConsoleButton, enablePrivateApi, highlightTagsInListItem } from './scripts';

export const main = () => {
  runOnScrapboxReady(async () => {
    await importRxJS();

    // register custom web components to browser
    defineCustomElements();
    // components will be connect to DOM
    componentManager.setupComponents();

    highlightTagsInListItem();
    enableConsoleButton();

    // add custom css class to body tag
    applyLoginCSSClass();
    // enable private api
    enablePrivateApi();
  });
};
