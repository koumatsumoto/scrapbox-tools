import { Line } from '../../types';
import { getTitleLine } from './line';
import { getLines } from './scrapbox';

export const isEmptyPage = (lines: Line[] = getLines()) => {
  const title = getTitleLine(lines);

  return lines.length === 1 && title.text === '';
};

export const isTitleOnlyPage = (lines: Line[] = getLines()) => {
  const title = getTitleLine(lines);

  return lines.length === 1 && title.text !== '';
};

export const endWithEmptyLine = (lines: Line[] = getLines()) => {
  const last = lines[lines.length - 1];

  return last.text === '';
};
