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

export const isTitleOnlyPage = (lines: PageLine[] = getLines()) => {
  const title = getTitleLine(lines);

  return lines.length === 1 && title.text !== '';
};

export const endWithEmptyLine = (lines: PageLine[] = getLines()) => {
  const last = lines[lines.length - 1];

  return last.text === '';
};
