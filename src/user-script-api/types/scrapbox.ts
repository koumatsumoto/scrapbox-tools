import { Layout } from './layout';
import { PageMenu } from './page-menu';
import { USPage } from './page';
import { PopupMenu } from './popup-menu';
import { USProject } from './project';
import { TimeStamp } from './time-stamp';

export interface Scrapbox {
  Layout: Layout;
  Page: USPage;
  PageMenu: PageMenu;
  PopupMenu: PopupMenu;
  Project: USProject;
  TimeStamp: TimeStamp;
}

declare global {
  interface Window {
    scrapbox: Scrapbox;
  }
}
