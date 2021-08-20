import { Layout } from './layout';
import { USPage } from './page';
import { PageMenu } from './page-menu';
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
