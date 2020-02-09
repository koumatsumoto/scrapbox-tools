import { getDateText, getTimeText, isDiaryPageTitle, makeTag } from '../../../libs/scrapbox';
import { getLines, hasEmptyEOF } from '../../../libs/scrapbox/public-api';
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

  const changes: { text: string }[] = [];
  const timeWord = isDiaryPageTitle(lines[0].text) ? getTimeText(date) : getDateText(date);
  const tagLineText = [timeWord, ...words].map(makeTag).join(' ');

  if (lines.length === 1) {
    // title only
    // in this case, don't insert an empty line
  } else if (!hasEmptyEOF(lines)) {
    changes.push({ text: '' });
  }

  changes.push({ text: tagLineText });
  changes.push({ text: '' });

  return changes;
};
