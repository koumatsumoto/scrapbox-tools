export type PopupMenu = {
  addButton: (param: { title: string; onClick: (selectedText: string) => string }) => void;
};
