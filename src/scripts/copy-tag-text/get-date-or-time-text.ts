import { getDateText, getScrapboxPageType, getTimeText } from '../../libs/scrapbox';

export const getDateOrTimeText = () => {
  const type = getScrapboxPageType();

  return type === 'diary' ? getTimeText() : getDateText();
};
