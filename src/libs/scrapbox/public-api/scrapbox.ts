import { Scrapbox } from '../../../types/scrapbox';

const baseUrl = 'https://scrapbox.io';

export const getScrapbox = () => window.scrapbox;

export const getLines = () => getScrapbox().Page.lines;

export const getCurrentProjectName = (scrapbox: Scrapbox = getScrapbox()) => scrapbox.Project.name;

export const getCurrentPageName = () => getScrapbox().Page.title;

export const getPageUrl = (title: string) => `${baseUrl}/${encodeURIComponent(getCurrentProjectName())}/${encodeURIComponent(title)}`;

// ready after api requests initiated on react bootstrap completed
export const isScrapboxReady = () => getCurrentProjectName() !== undefined && getCurrentPageName() !== undefined;

// TODO: currently not working, react-router not recognize history change
export const changeRoute = (title: string, scrapbox: Scrapbox = getScrapbox()) =>
  window.history.pushState(
    {
      path: `/${encodeURIComponent(getCurrentProjectName(scrapbox))}/${encodeURIComponent(title)}`,
    },
    title,
  );

// TODO: use react-router instead window.location to improve performance
export const loadPage = (title: string, scrapbox: Scrapbox = getScrapbox()) => {
  window.location.assign(`/${encodeURIComponent(getCurrentProjectName(scrapbox))}/${encodeURIComponent(title)}`);
};
