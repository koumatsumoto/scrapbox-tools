import { customCSSClassName } from '../constants';
import { getAllFirstLevelTextElements, isElementNode, registerCustomCSSClass } from '../util';

/**
 * Add custom css class to time section text like as "24:00"
 */
const isTimeTextElement = (e: Element) => e.childElementCount === 5 && e.childNodes[2].textContent === ':';
const getAllTimeTextElement = () =>
  getAllFirstLevelTextElements()
    .map((n) => {
      if (isTimeTextElement(n)) {
        return n;
      } else if (n.firstChild && isElementNode(n.firstChild) && isTimeTextElement(n.firstChild)) {
        return n.firstChild;
      } else {
        return null;
      }
    })
    .filter((n) => !!n) as Element[];

export const applyTimeTextClass = () =>
  registerCustomCSSClass(getAllTimeTextElement, customCSSClassName.headingTimeText, isTimeTextElement);
