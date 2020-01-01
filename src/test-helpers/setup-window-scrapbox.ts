import '../types';
import { PageLine, Scrapbox } from '../types/scrapbox';

export type SetupWindowScrapboxOption = {
  layout?: Scrapbox['Layout'];
  pageTitle?: string;
  projectName?: string;
  pageLines?: PageLine[];
};

const empty: () => void = () => {
  // do nothing
};

export const setupWindowScrapbox = (option: SetupWindowScrapboxOption = {}) => {
  window.scrapbox = {
    Layout: option.layout ? option.layout : 'page',
    Page: {
      title: option.pageTitle ? option.pageTitle : '',
      lines: option.pageLines ? option.pageLines : [],
    },
    PageMenu: {
      addItem: empty,
      addMenu: empty,
      addSeparator: empty,
      removeAllItems: empty,
    },
    PopupMenu: {
      addButton: empty,
    },
    Project: { name: option.projectName ? option.projectName : '', pages: [] },
    TimeStamp: {
      addFormat: empty,
      removeAllFormats: empty,
    },
  };
};
