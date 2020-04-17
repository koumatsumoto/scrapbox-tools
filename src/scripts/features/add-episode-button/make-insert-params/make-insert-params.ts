import { getDateText, getLastLineId, getTimeText, isDiaryPageTitle, isEmptyPage, makeTag } from '../../../../libs/scrapbox';
import { CommitChangeParam } from '../../../../libs/scrapbox/private-api/websocket-clinet';
import { endWithEmptyLine, getLines } from '../../../../libs/scrapbox/public-api';
import { Line } from '../../../../libs/scrapbox/types';

/**
 *
 * @param tagLineText
 * @param lines - for testing
 */
export const makeInsertParams = (words: string[], date: Date = new Date(), lines: Line[] = getLines()): CommitChangeParam[] => {
  if (lines.length < 1) {
    throw new Error('Bad impl, this function requires at least one line');
  }

  const changes: CommitChangeParam[] = [];
  const titleLine = lines[0];

  // construct a tag of date or time.
  // if diary page, use time (e.g. "24:00")
  // if other page, use date and time (e.g. "2020/02/16", "24:00")
  let tagLineText: string;
  if (isEmptyPage(lines) || isDiaryPageTitle(lines[0].text)) {
    tagLineText = [getTimeText(date), ...words].map(makeTag).join(' ');
  } else {
    tagLineText = [getDateText(date), getTimeText(date), ...words].map(makeTag).join(' ');
  }

  switch (lines.length) {
    // an empty or title-only page
    // if empty page, need update title with date string
    case 1: {
      // if empty, use date to title.
      const title = titleLine.text === '' ? getDateText(date) : titleLine.text;
      changes.push({ type: 'title', title });
      changes.push({ type: 'insert', text: tagLineText });
      changes.push({ type: 'insert', text: '' });
      changes.push({ type: 'description', text: tagLineText });

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
