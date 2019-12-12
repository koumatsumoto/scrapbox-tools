import { cssClassUpdateInterval, customCSSClassName, nodeSelector } from '../constants';
import { getElementsByCSSClass, removeHead, isTagString } from '../util';

/**
 * Remove hash and add custom css class to link-text in list-item
 * Add custom css class to time text in list-item
 */
const getAllPageLinkTextInListItem = () => getElementsByCSSClass(nodeSelector.pageLinkTextInListItem);
const removeHashAndAddCustomClass = () =>
  getAllPageLinkTextInListItem().forEach((node) => {
    const text = node.textContent || '';
    if (isTagString(text)) {
      node.textContent = removeHead(text);
      node.classList.add(customCSSClassName.hashInListItem);
    }
  });

const getAllTextInListItem = () => getElementsByCSSClass(nodeSelector.textInListItem);
const isTimeTextElementInListItem = (element: Element) =>
  element.textContent && element.textContent.length === 5 && element.textContent[2] === ':';
const addCustomClassToTimeTextInListItem = () =>
  getAllTextInListItem().forEach((element) => {
    if (isTimeTextElementInListItem(element)) {
      element.classList.add(customCSSClassName.hashInListItem);
    }
  });

const countListItem = () => getElementsByCSSClass(nodeSelector.pageListItem).length;
const registerCustomCSSClassInPageListItem = () => {
  const update = () => {
    removeHashAndAddCustomClass();
    addCustomClassToTimeTextInListItem();
  };

  let countOnUpdated = countListItem();
  update();

  setInterval(() => {
    const currentCount = countListItem();
    if (currentCount !== countOnUpdated) {
      countOnUpdated = currentCount;
      update();
    }
  }, cssClassUpdateInterval);
};
export const trimHashAndAddClassToTagsInListItems = () => registerCustomCSSClassInPageListItem();
