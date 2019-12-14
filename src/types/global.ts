import { Scrapbox } from './scrapbox';

declare global {
  interface Window {
    scrapbox: Scrapbox;
  }
}
