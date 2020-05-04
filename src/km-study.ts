/**
 * Common variables and functions (Scrapbox loads each scripts into global environment)
 */
import { getApiManager } from './libs/scrapbox/private-api';
import { runOnScrapboxReady } from './libs/scrapbox/public-api';
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
    getApiManager().catch();

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
