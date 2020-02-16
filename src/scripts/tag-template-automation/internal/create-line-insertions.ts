import { getDateText, getLastLineId, getTimeText, isDiaryPageTitle, makeTag } from '../../../libs/scrapbox';
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
  const timeWord = isDiaryPageTitle(lines[0].text) ? getTimeText(date) : getDateText(date);
  const tagLineText = [timeWord, ...words].map(makeTag).join(' ');

  switch (lines.length) {
    // title only
    // in this case, don't insert an empty line after title
    case 1: {
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
