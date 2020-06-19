import { ScrapboxLine } from '../types';
import { ID } from './id';

export const findIndex = (searchString: string, lines: { text: string }[]) => {
  return lines.findIndex((line) => line.text.includes(searchString));
};
export const findLineId = (searchString: string, lines: { id: ID; text: string }[]): ID | null => {
  const found = lines[findIndex(searchString, lines)];

  return found ? found.id : null;
};
export const findNextLineId = (searchString: string, lines: { id: ID; text: string }[]): ID | null => {
  const index = findIndex(searchString, lines);
  if (index === -1) {
    return null;
  }

  const next = lines[index + 1];

  return next ? next.id : null;
};

// page has one line at least
export const getTitleLine = (lines: ScrapboxLine[]): ScrapboxLine => lines[0]!;
export const isEmptyLine = (line: ScrapboxLine) => line.text === '';
export const getLastLineId = (lines: ScrapboxLine[]): ID => lines[lines.length - 1]!.id;
