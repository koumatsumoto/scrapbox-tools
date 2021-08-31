import { USLine } from './line';

export type USPage =
  | {
      title: string;
      lines: USLine[];
    }
  | {
      // if scrapbox.Layout !== 'page'
      title: null;
      lines: null;
    };
