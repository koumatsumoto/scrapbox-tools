import '../../../types/scrapbox';

export const getScrapbox = () => window.scrapbox;

export const getLines = () => getScrapbox().Page.lines;

export const getCurrentProjectName = () => getScrapbox().Project.name;

export const getCurrentPageName = () => getScrapbox().Page.title;

// ready after api requests initiated on react bootstrap completed
export const isScrapboxReady = () => getCurrentProjectName() !== undefined && getCurrentPageName() !== undefined;
