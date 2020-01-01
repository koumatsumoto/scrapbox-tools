import { customCSSClassName, nodeSelector } from '../config';
import { getElements, registerElementManagement, removeHead } from '../../libs/common';
import { isTagString } from '../../libs/scrapbox';

/**
 * Remove hash and add custom css class to link-text in list-item
 * Add custom css class to time text in list-item
 */
export const highlightTagsInListItem = () =>
  registerElementManagement({
    searchFn: () => getElements(nodeSelector.pageLinkTextInListItem),
    watchCondition: (elem) => isTagString(elem.textContent),
    onFirstCheck: (elem) => {
      const text = elem.textContent || '';
      if (isTagString(text)) {
        elem.textContent = removeHead(text);
        elem.classList.add(customCSSClassName.hashInListItem);
      }
    },
    onRemove: () => {
      // do nothing
    },
    checkInterval: 1000 * 5,
  });
