import '../types';

export const setupWindowScrapbox = () => {
  window.scrapbox = {
    Layout: 'page',
    Page: {
      title: '',
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
    Project: { name: '', pages: [] },
    TimeStamp: {
      addFormat: () => {},
      removeAllFormats: () => {},
    },
  };
};
