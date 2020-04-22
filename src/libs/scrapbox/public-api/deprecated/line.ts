import { ScrapboxLine } from '../../types';
import { getLines } from '../index';
import { ID } from './id';

export const findLineIndex = (searchString: string, lines: ScrapboxLine[] = getLines()) => {
  return lines.findIndex((line) => line.text.includes(searchString));
};

export const findLineId = (searchString: string, lines: ScrapboxLine[] = getLines()): ID | null => {
  const found = lines[findLineIndex(searchString, lines)];

  return found ? found.id : null;
};

export const findNextLineId = (searchString: string, lines: ScrapboxLine[] = getLines()): ID | null => {
  const index = findLineIndex(searchString, lines);
  if (index === -1) {
    return null;
  }

  const next = lines[index + 1];

  return next ? next.id : null;
};

// page has one line at least
export const getTitleLine = (lines: ScrapboxLine[] = getLines()): ScrapboxLine => lines[0]!;

export const isEmptyLine = (line: ScrapboxLine) => line.text === '';

export const getLastLineId = (lines: ScrapboxLine[] = getLines()): ID => lines[lines.length - 1]!.id;
