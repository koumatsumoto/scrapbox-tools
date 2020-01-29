import { PageLine } from '../../../types/scrapbox';
import { getTitleLine } from './line';
import { getLines, getScrapbox } from './scrapbox';

export const isPage = () => {
  return getScrapbox().Layout === 'page';
};

export const isEmptyPage = (lines: PageLine[] = getLines()) => {
  const title = getTitleLine(lines);

  return lines.length === 1 && title.text === '';
};

export const hasEmptyEOF = (lines: PageLine[] = getLines()) => {
  const last = lines[lines.length - 1];

  return last.text === '';
};

const pageChangeObserveInterval = 250;
export const onPageChange = (callback: (title: string | null) => any) => {
  let state: string | null = getScrapbox().Page.title;

  window.setInterval(() => {
    const current = getScrapbox().Page.title;
    if (current !== state) {
      state = current;
      callback(state);
    }
  }, pageChangeObserveInterval);
};
