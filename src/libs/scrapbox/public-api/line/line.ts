import { filter, map } from 'fp-ts/es6/Array';
import { fromNullable, getOrElse, mapNullable } from 'fp-ts/es6/Option';
import { pipe } from 'fp-ts/es6/pipeable';
// window.scrapbox type is loaded also
import { Line, TagLine } from '../../types';

// some(scrapbox) or none
export const getLines = (w = window) =>
  pipe(
    fromNullable(w.scrapbox),
    mapNullable((s) => s.Page.lines),
    getOrElse(() => [] as Line[]),
  );

export const isTagLine = (line: Line): line is TagLine => line.text.startsWith('#');

// get all lines that starts with '#'
// if page layout is not 'page', return empty array
export const getTagLines = (w = window) => pipe(getLines(w), filter(isTagLine));

export const getTagLineIds = (w = window) =>
  pipe(
    getTagLines(w),
    map((line: TagLine) => line.id),
  );

export const getTagLineIdsForDOM = (w = window) =>
  pipe(
    getTagLines(w),
    map((line: TagLine) => 'L' + line.id),
  );
