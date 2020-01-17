import '../../../types/scrapbox';

export const getScrapbox = () => window.scrapbox;

export const getCurrentProjectName = () => {
  getScrapbox().Project.name;
};

export const getCurrentPageName = () => {
  getScrapbox().Page.title;
};
