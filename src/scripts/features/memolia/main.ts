import { makeMemory } from './parse/memory';
import { stylizeEpisodeLines } from './stylize/stylize-episode-lines';
import { registerOnClick } from './transcript/on-click';

export const useMemolia = () => {
  let prevCount = 0;
  const fn = () => {
    if (window.scrapbox.Page.lines) {
      if (prevCount !== window.scrapbox.Page.lines.length) {
        prevCount = window.scrapbox.Page.lines.length;
        const memory = makeMemory(window.scrapbox.Page.lines);
        console.log('[sx/memolia] Memory', memory);
        stylizeEpisodeLines(memory);

        registerOnClick();
      }
    }
  };

  fn();
  setInterval(fn, 1000);
};
