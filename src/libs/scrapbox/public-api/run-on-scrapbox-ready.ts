import { runOnDocumentReady } from '../../common';
import { isScrapboxReady } from './scrapbox';

const reactBootstrapCheckInterval = 20;

export const runOnScrapboxReady = (fn: Function) => {
  runOnDocumentReady(() => {
    const id = window.setInterval(() => {
      if (isScrapboxReady()) {
        window.clearInterval(id);
        fn();
      }
    }, reactBootstrapCheckInterval);
  });
};
