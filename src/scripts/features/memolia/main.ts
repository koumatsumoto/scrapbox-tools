import { makeMemory } from './internal/memory';

export const useMemolia = () => {
  let prevCount = 0;
  const fn = () => {
    if (window.scrapbox.Page.lines) {
      if (prevCount !== window.scrapbox.Page.lines.length) {
        prevCount = window.scrapbox.Page.lines.length;
        console.log('[dev] memolia', makeMemory(window.scrapbox.Page.lines));
      }
    }
  };

  fn();
  setInterval(fn, 1000);
};
