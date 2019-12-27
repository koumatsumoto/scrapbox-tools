import * as puppeteer from 'puppeteer';
import '../../types/scrapbox';

export const getLastUpdatedDate = async (page: puppeteer.Page) =>
  page.evaluate(() => {
    const lastUpdatedSeconds = window.scrapbox.Page.lines.map((l) => l.updated).reduce((prev, curr) => (prev < curr ? curr : prev), 0);

    // time in scrapbox is seconds, and Date requires milli seconds
    return lastUpdatedSeconds * 1000;
  });
