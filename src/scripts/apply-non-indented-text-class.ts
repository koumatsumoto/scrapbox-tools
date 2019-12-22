import { customCSSClassName } from '../constants';
import { getAllFirstLevelTextElements, registerCustomCSSClass } from '../util';

/**
 * Add custom css class to non-indented text
 */
//
const isNonIndentedTextNode = (n: Element) => !!(n.firstChild && n.firstChild.firstChild && n.firstChild.firstChild.nodeType === 3);
const getAllNonIndentedTextNodes = () => getAllFirstLevelTextElements().filter(isNonIndentedTextNode);

export const applyNonIndentedTextClass = () =>
  registerCustomCSSClass(getAllNonIndentedTextNodes, customCSSClassName.nonIndentedText, isNonIndentedTextNode);
