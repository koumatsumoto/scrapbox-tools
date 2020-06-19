import { getTagLineIds, getTagLineIdsForDOM } from './scrapbox-object/line';

export * from './deprecated/id';
export * from './deprecated/line';
export * from './deprecated/page';
export * from './deprecated/util';
export * from './deprecated/scrapbox';

export const scrapbox = {
  getTagLineIds,
  getTagLineIdsForDOM,
};
