import { getDateText, getLastLineId, getTimeText, ID, isDiaryPageTitle, makeTag } from '../../../libs/scrapbox';
import { getLines, endWithEmptyLine } from '../../../libs/scrapbox/public-api';
import { PageLine } from '../../../types/scrapbox';

/**
 *
 * @param tagLineText
 * @param lines - for testing
 */
export const createLineInsertions = (words: string[], date: Date = new Date(), lines: PageLine[] = getLines()) => {
  if (lines.length < 1) {
    throw new Error('Bad impl, this function requires at least one line');
  }

  const changes: { text: string; position?: ID }[] = [];
  const timeWord = isDiaryPageTitle(lines[0].text) ? getTimeText(date) : getDateText(date);
  const tagLineText = [timeWord, ...words].map(makeTag).join(' ');

  switch (lines.length) {
    // title only
    // in this case, don't insert an empty line after title
    case 1: {
      changes.push({ text: tagLineText });
      changes.push({ text: '' });

      break;
    }
    // title and description or empty line
    // if empty line, replace it with tag line
    case 2: {
      if (endWithEmptyLine(lines)) {
        changes.push({ text: tagLineText, position: getLastLineId(lines) });
        changes.push({ text: '' });
      } else {
        changes.push({ text: '' });
        changes.push({ text: tagLineText });
        changes.push({ text: '' });
      }

      break;
    }
    default: {
      if (!endWithEmptyLine(lines)) {
        changes.push({ text: '' });
      }

      changes.push({ text: tagLineText });
      changes.push({ text: '' });
    }
  }

  return changes;
};
