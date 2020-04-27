import { colorChildEpisodeLines } from './internal/color-child-episode-lines';
import { makeMemory } from './internal/memory';

export const useMemolia = () => {
  let prevCount = 0;
  const fn = () => {
    if (window.scrapbox.Page.lines) {
      if (prevCount !== window.scrapbox.Page.lines.length) {
        prevCount = window.scrapbox.Page.lines.length;
        const memory = makeMemory(window.scrapbox.Page.lines);
        console.log('[dev] memolia', memory);
        colorChildEpisodeLines(memory);
      }
    }
  };

  fn();
  setInterval(fn, 1000);
};
