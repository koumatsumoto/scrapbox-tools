/**
 * Common variables and functions (Scrapbox loads each scripts into global environment)
 */
import { getGlobalScrapboxApi } from './libs/scrapbox/api';
import { getCurrentProjectName, runOnScrapboxReady } from './libs/scrapbox/browser-api';
import {
  applyLoginCSSClass,
  enableCustomListItem,
  getDynamicConfig,
  useAddEpisodeButton,
  useMemolia,
  useVersionNotificator,
} from './scripts';

const main = () => {
  runOnScrapboxReady(async () => {
    // connect to websocket, fetch initial data from api
    getGlobalScrapboxApi(getCurrentProjectName()).catch();

    enableCustomListItem();

    // add custom css class to body tag
    applyLoginCSSClass();

    // since 2020/04/20
    useAddEpisodeButton();
    // since 2020/04/20
    useMemolia();
    // since 2020/04/27
    useVersionNotificator();
    // since 2020-04-28
    getDynamicConfig().catch();
  });
};

main();
