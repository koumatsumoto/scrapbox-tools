import { PageLine } from '../../../types/scrapbox';
import { ID } from './id';
import { getLines } from './index';

export const findLineIndex = (searchString: string, lines: PageLine[] = getLines()) => {
  return lines.findIndex((line) => line.text.includes(searchString));
};

export const findLineId = (searchString: string, lines: PageLine[] = getLines()): ID | null => {
  const found = lines[findLineIndex(searchString, lines)];

  return found ? found.id : null;
};

export const findNextLineId = (searchString: string, lines: PageLine[] = getLines()): ID | null => {
  const index = findLineIndex(searchString, lines);
  if (index === -1) {
    return null;
  }

  const next = lines[index + 1];

  return next ? next.id : null;
};

// page has one line at least
export const getTitleLine = (lines: PageLine[] = getLines()): PageLine => lines[0]!;
