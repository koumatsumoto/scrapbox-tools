import { getDateText, getScrapboxPageType, getTimeText } from '../../util/scrapbox';

export const getDateOrTimeText = () => {
  const type = getScrapboxPageType();

  return type === 'diary' ? getDateText() : getTimeText();
};
