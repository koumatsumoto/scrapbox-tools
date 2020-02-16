import { getDateText, getLastLineId, getTimeText, isDiaryPageTitle, isEmptyPage, makeTag } from '../../../libs/scrapbox';
import { CommitChangeParam } from '../../../libs/scrapbox/private-api/websocket-clinet';
import { endWithEmptyLine, getLines } from '../../../libs/scrapbox/public-api';
import { PageLine } from '../../../types/scrapbox';

/**
 *
 * @param tagLineText
 * @param lines - for testing
 */
export const createLineInsertions = (words: string[], date: Date = new Date(), lines: PageLine[] = getLines()): CommitChangeParam[] => {
  if (lines.length < 1) {
    throw new Error('Bad impl, this function requires at least one line');
  }

  const changes: CommitChangeParam[] = [];
  const titleLine = lines[0];

  // construct a tag of date or time.
  // if diary page, use time (e.g. "24:00")
  // if other page, use date (e.g. "2020/02/16")
  let timeOrDate: string;
  if (isEmptyPage(lines)) {
    timeOrDate = getTimeText(date);
  } else if (isDiaryPageTitle(lines[0].text)) {
    timeOrDate = getTimeText(date);
  } else {
    timeOrDate = getDateText(date);
  }
  const tagLineText = [timeOrDate, ...words].map(makeTag).join(' ');

  switch (lines.length) {
    // an empty or title-only page
    // if empty page, need update title with date string
    case 1: {
      if (titleLine.text === '') {
        const title = getDateText();
        changes.push({ type: 'update', id: titleLine.id, text: title });
        changes.push({ type: 'title', title });
      }

      changes.push({ type: 'insert', text: tagLineText });
      changes.push({ type: 'insert', text: '' });
      changes.push({ type: 'description', text: 'tagLineText' });

      break;
    }
    // title and description or empty line
    // if empty line, replace it with tag line
    case 2: {
      if (endWithEmptyLine(lines)) {
        changes.push({ type: 'insert', text: tagLineText, position: getLastLineId(lines) });
        changes.push({ type: 'insert', text: '' });
      } else {
        changes.push({ type: 'insert', text: '' });
        changes.push({ type: 'insert', text: tagLineText });
        changes.push({ type: 'insert', text: '' });
      }

      break;
    }
    default: {
      if (!endWithEmptyLine(lines)) {
        changes.push({ type: 'insert', text: '' });
      }

      changes.push({ type: 'insert', text: tagLineText });
      changes.push({ type: 'insert', text: '' });
    }
  }

  return changes;
};
