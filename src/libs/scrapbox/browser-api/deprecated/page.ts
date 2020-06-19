import { ScrapboxLine } from '../../types';
import { getTitleLine } from '../../util';
import { getLines } from './scrapbox';

export const isEmptyPage = (lines: ScrapboxLine[] = getLines()) => {
  const title = getTitleLine(lines);

  return lines.length === 1 && title.text === '';
};

export const isTitleOnlyPage = (lines: ScrapboxLine[] = getLines()) => {
  const title = getTitleLine(lines);

  return lines.length === 1 && title.text !== '';
};

export const endWithEmptyLine = (lines: ScrapboxLine[] = getLines()) => {
  const last = lines[lines.length - 1];

  return last.text === '';
};
