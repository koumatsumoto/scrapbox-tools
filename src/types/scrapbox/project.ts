export type ExistentPageListItem = {
  id: string;
  // e.g. 'Surface Pro X'
  title: string;
  // e.g. 'surface_pro_x'
  titleLc: string;
  updated: number;
  exists: true;
};

export type NonExistentPageListItem = {
  // e.g. 'Surface Pro X'
  title: string;
  // e.g. 'surface_pro_x'
  titleLc: string;
  updated: number;
  exists: false;
};

export type ScrapboxProjectPage = ExistentPageListItem | NonExistentPageListItem;

export type ScrapboxProject = {
  name: string;
  pages: ScrapboxProjectPage[];
};
