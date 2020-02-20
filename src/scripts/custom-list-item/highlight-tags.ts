import { getElements, registerElementManagement, removeHead } from '../../libs/common';
import { isTagString } from '../../libs/scrapbox';
import { customCSSClassName, nodeSelector } from '../config';

/**
 * Remove hash and add custom css class to link-text in list-item
 * Add custom css class to time text in list-item
 */
export const highlightTags = () =>
  registerElementManagement({
    targetsSelector: () => getElements(nodeSelector.pageLinkTextInListItem),
    clearFlagCondition: (elem) => !isTagString(elem.textContent),
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
