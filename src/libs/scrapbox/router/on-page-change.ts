import { getScrapbox } from '../public-api';

const pageChangeObserveInterval = 250;
export const onPageChange = (callback: (title: string | null) => any) => {
  let state: string | null = getScrapbox().Page.title;

  window.setInterval(() => {
    const current = getScrapbox().Page.title;
    if (current !== state) {
      state = current;
      callback(state);
    }
  }, pageChangeObserveInterval);
};
