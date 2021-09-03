export interface Room {
  projectId: string;
  pageId: string;
}

export const isSameRoom = (a: Room | null, b: Room | null) => {
  return a?.projectId === b?.projectId && a?.pageId === b?.pageId;
};
