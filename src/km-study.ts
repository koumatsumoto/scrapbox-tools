/**
 * Common variables and functions (Scrapbox loads each scripts into global environment)
 */
import { defineCustomElements } from './components';
import { importRxJS } from './libs/common';
import { runOnScrapboxReady } from './libs/scrapbox/public-api';
import {
  addDatetimeOnListItem,
  applyLoginCSSClass,
  componentManager,
  enableCustomListItem,
  registerUpdatingNewButton,
  setupLibs,
} from './scripts';

const main = () => {
  runOnScrapboxReady(async () => {
    await importRxJS();

    // connect to websocket, fetch initial data from api
    setupLibs();

    // register custom web components to browser
    defineCustomElements();
    // components will be connect to DOM
    componentManager.setupComponents();

    enableCustomListItem();

    // add custom css class to body tag
    applyLoginCSSClass();
    // display datetime on list-item
    addDatetimeOnListItem();

    registerUpdatingNewButton();
  });
};

main();
