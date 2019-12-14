import '../types';
import { Scrapbox } from '../types/scrapbox';

export const setupWindowScrapbox = (
  option: {
    layout?: Scrapbox['Layout'];
    pageTitle?: string;
    projectName?: string;
  } = {},
) => {
  window.scrapbox = {
    Layout: option.layout ? option.layout : 'page',
    Page: {
      title: option.pageTitle ? option.pageTitle : '',
      lines: [],
    },
    PageMenu: {
      addItem: () => {},
      addMenu: () => {},
      addSeparator: () => {},
      removeAllItems: () => {},
    },
    PopupMenu: {
      addButton: () => {},
    },
    Project: { name: option.projectName ? option.projectName : '', pages: [] },
    TimeStamp: {
      addFormat: () => {},
      removeAllFormats: () => {},
    },
  };
};
