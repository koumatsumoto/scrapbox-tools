import { registerElementManagement, removeHead } from '../../libs/common';
import { isTagString } from '../../libs/scrapbox';
import { customCSSClassName } from '../config';
import { tagTextSelectorFn } from './config';

/**
 * Remove hash and add custom css class to link-text in list-item
 * Add custom css class to time text in list-item
 */
export const highlightTags = () =>
  registerElementManagement({
    targetsSelector: tagTextSelectorFn,
    clearFlagCondition: (elem) => !isTagString(elem.textContent),
    onFirstCheck: (elem) => {
      const text = elem.textContent || '';
      if (isTagString(text)) {
        elem.textContent = removeHead(text);
        elem.classList.add(customCSSClassName.hashInListItem);
      }
    },
    checkInterval: 1000 * 5,
  });
