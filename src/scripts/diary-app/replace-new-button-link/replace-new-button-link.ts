import { getDateText, onPageChange } from '../../../libs/scrapbox';
import { selectNewButtons } from '../config';

export const makeLink = (source: string, word: string) => source.replace('new', encodeURIComponent(word));

export const replaceNewButtonLink = () => {
  const targets = selectNewButtons();

  for (const e of targets) {
    e.href = makeLink(e.href, getDateText());
  }
};

export const registerUpdatingNewButton = () => {
  // initial
  replaceNewButtonLink();
  // on route change
  onPageChange(replaceNewButtonLink);
};
