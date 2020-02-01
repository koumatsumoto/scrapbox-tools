import { getDateText, getScrapboxPageType, getTimeText } from '../../libs/scrapbox';

export const getDateOrTimeText = () => {
  const type = getScrapboxPageType();
  switch (type) {
    case 'empty':
    case 'diary': {
      return getTimeText();
    }
    case 'symbol':
    case 'other': {
      return getDateText();
    }
  }
};
