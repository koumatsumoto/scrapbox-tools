import '../types';
import { PageLine, Scrapbox } from '../types/scrapbox';

export type SetupWindowScrapboxOption = {
  layout?: Scrapbox['Layout'];
  pageTitle?: string;
  projectName?: string;
  pageLines?: PageLine[];
};

export const setupWindowScrapbox = (option: SetupWindowScrapboxOption = {}) => {
  window.scrapbox = {
    Layout: option.layout ? option.layout : 'page',
    Page: {
      title: option.pageTitle ? option.pageTitle : '',
      lines: option.pageLines ? option.pageLines : [],
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
