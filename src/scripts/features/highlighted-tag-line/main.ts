import { compact, filter, map } from 'fp-ts/es6/Array';
import { isSome } from 'fp-ts/es6/Option';
import { pipe } from 'fp-ts/es6/pipeable';
import { findElement } from '../../../libs/common/dom';
import { scrapbox } from '../../../libs/scrapbox/public-api';

const dataKeyName = 'sxHighlightedTagLine'; // data-sx-highlighted-tag-line
const applyStyle = (e: HTMLElement) => (e.dataset[dataKeyName] = 'enabled');

const highlightTagLines = () => {
  const elements = pipe(
    scrapbox.getTagLineIdsForDOM(window),
    map((id: string) => findElement<HTMLElement>(`#${id}`)),
    filter(isSome),
    compact,
  );

  try {
    elements.forEach((e) => applyStyle(e));
  } catch (e) {
    console.error('[highlighted-tag-line]', e);
  }
};

export const useHighlightedTagLine = () => {
  highlightTagLines();
  setInterval(highlightTagLines, 1000);
};
