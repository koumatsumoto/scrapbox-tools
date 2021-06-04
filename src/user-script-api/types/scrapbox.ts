import { Layout } from './layout';
import { PageMenu } from './page-menu';
import { Page } from './page';
import { PopupMenu } from './popup-menu';
import { Project } from './project';
import { TimeStamp } from './time-stamp';

export interface Scrapbox {
  Layout: Layout;
  Page: Page;
  PageMenu: PageMenu;
  PopupMenu: PopupMenu;
  Project: Project;
  TimeStamp: TimeStamp;
}

declare global {
  interface Window {
    scrapbox: Scrapbox;
  }
}
