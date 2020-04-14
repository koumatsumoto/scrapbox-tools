import { Brand } from '../../../types';
import { findElementOrFail, getElements } from '../../common';
import { selectors } from './internal/selectors';

type ListItemElement = Brand<Element, 'ListItemElement'>;

const selectListItems = (parent: ParentNode = document) => getElements(selectors.listItem, parent) as ListItemElement[];

const selectTitle = (element: ListItemElement) => findElementOrFail('.title', element);

export const selectContainer = (element: ListItemElement) => findElementOrFail('.content', element);

// internal
const retrieveTitle = (listItem: ListItemElement) => {
  const title = selectTitle(listItem);

  return title.textContent;
};

export const retrieveListItemsWithTitle = (parent: ParentNode = document) => {
  const map = new Map<string, ListItemElement>();
  for (const e of selectListItems(parent)) {
    const title = retrieveTitle(e);
    if (title) {
      map.set(title, e);
    }
  }

  return map;
};
