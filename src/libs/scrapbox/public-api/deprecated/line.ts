import { Line } from '../../types';
import { getLines } from '../index';
import { ID } from './id';

export const findLineIndex = (searchString: string, lines: Line[] = getLines()) => {
  return lines.findIndex((line) => line.text.includes(searchString));
};

export const findLineId = (searchString: string, lines: Line[] = getLines()): ID | null => {
  const found = lines[findLineIndex(searchString, lines)];

  return found ? found.id : null;
};

export const findNextLineId = (searchString: string, lines: Line[] = getLines()): ID | null => {
  const index = findLineIndex(searchString, lines);
  if (index === -1) {
    return null;
  }

  const next = lines[index + 1];

  return next ? next.id : null;
};

// page has one line at least
export const getTitleLine = (lines: Line[] = getLines()): Line => lines[0]!;

export const isEmptyLine = (line: Line) => line.text === '';

export const getLastLineId = (lines: Line[] = getLines()): ID => lines[lines.length - 1]!.id;
