import { ScrapboxPage } from './page';
import { ScrapboxProject } from './project';

export type Scrapbox = {
  Layout: 'page';
  Page: ScrapboxPage;
  PageMenu: {
    addItem: (param: { title: string; onClick: () => void }) => void;
    addMenu: (param: { title: string; image: string; onClick: () => void }) => void;
    addSeparator: Function;
    removeAllItems: Function;
  };
  PopupMenu: {
    addButton: (param: { title: string; onClick: (selectedText: string) => string }) => void;
  };
  Project: ScrapboxProject;
  TimeStamp: {
    addFormat: (momentFormat: string) => void;
    removeAllFormats: () => void;
  };
};
