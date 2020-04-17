import { ExistentPageListItem, Scrapbox, ScrapboxProjectPage } from '../../types';

const baseUrl = 'https://scrapbox.io';

export const getScrapbox = () => window.scrapbox;

export const getLines = (scrapbox: Scrapbox = getScrapbox()) => scrapbox.Page.lines || [];

export const getFirstLineOrFail = (scrapbox: Scrapbox = getScrapbox()) => {
  const lines = getLines(scrapbox);
  const first = lines[0];
  if (first === undefined) {
    throw new Error('Failed to load first line');
  }

  return first;
};

export const getPages = (scrapbox: Scrapbox = getScrapbox()) => scrapbox.Project.pages;

export const getPageIdMap = (scrapbox: Scrapbox = getScrapbox()) => {
  const map = new Map<string, ExistentPageListItem>();

  for (const page of getPages(scrapbox)) {
    if (page.exists && page.id) {
      map.set(page.id, page);
    }
  }

  return map;
};

export const getPageTitleMap = (scrapbox: Scrapbox = getScrapbox()) => {
  const map = new Map<string, ScrapboxProjectPage>();

  for (const page of getPages(scrapbox)) {
    if (page.title) {
      map.set(page.title, page);
    }
  }

  return map;
};

export const getCurrentProjectName = (scrapbox: Scrapbox = getScrapbox()) => scrapbox.Project.name;

export const getCurrentPageName = () => getScrapbox().Page.title;

export const getPageUrl = (title: string) => `${baseUrl}/${encodeURIComponent(getCurrentProjectName())}/${encodeURIComponent(title)}`;

// ready after api requests initiated on react bootstrap completed
export const isScrapboxReady = () => getCurrentProjectName() !== undefined && getCurrentPageName() !== undefined;

// TODO: use react-router instead window.location to improve performance
export const loadPage = (title: string, scrapbox: Scrapbox = getScrapbox()) => {
  window.location.assign(`/${encodeURIComponent(getCurrentProjectName(scrapbox))}/${encodeURIComponent(title)}`);
};
