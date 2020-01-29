import { ValueOf } from '../../types';
import { scrapboxCustomFormat } from './datetime-operations';

export const customPageType = {
  // page whose title is date, e.g. '2019/12/14'
  diary: 'diary',
  // page whose title is not date
  symbol: 'symbol',
  // not page
  other: 'other',
} as const;

export const getScrapboxPageType = (): ValueOf<typeof customPageType> => {
  const layout = window.scrapbox.Layout;
  const title = window.scrapbox.Page.title;

  if (title === null) {
    return customPageType.other;
  }

  if (layout !== 'page') {
    return customPageType.other;
  }

  // 2020/01/28
  if (title.length !== 10) {
    return customPageType.symbol;
  }

  return scrapboxCustomFormat.date.test(title) ? customPageType.diary : customPageType.symbol;
};
