import { Line } from './line';

export type Page =
  | {
      title: string;
      lines: Line[];
    }
  | {
      // if scrapbox.Layout !== 'page'
      title: null;
      lines: null;
    };
