export type PageMenu = {
  addItem: (param: { title: string; onClick: () => void }) => void;
  addMenu: (param: { title: string; image: string; onClick: () => void }) => void;
  addSeparator: () => unknown;
  removeAllItems: () => unknown;
};
