export type ExistentPageListItem = {
  id: string;
  title: string;
  titleLc: string;
  updated: number;
  exists: true;
};

export type NonExistentPageListItem = {
  id: undefined;
  title: string;
  titleLc: string;
  updated: number;
  exists: false;
};

export type ScrapboxProjectPage = ExistentPageListItem | NonExistentPageListItem;

export type Project = {
  name: string;
  pages: ScrapboxProjectPage[];
};
