import { cssClassUpdateInterval, nodeSelector } from './constants';

export const getElementsByCSSClass = (className: string) => Array.from(document.querySelectorAll(className)) as Element[];
export const getAllTextElements = () => getElementsByCSSClass(nodeSelector.textLineInPage);
export const isElementNode = <(node: Node | Element) => node is Element>((node: Node | Element) => node.nodeType === 1);
export const getAllFirstLevelTextElements = () =>
  getAllTextElements()
    .map((n) => n.firstChild)
    .filter((n) => n && isElementNode(n)) as Element[];
export const getTargetClassElements = (className: string) => document.querySelectorAll(`.${className}`);
export const addCSSClassAll = (elements: Element[], className: string) => elements.forEach((n) => n.classList.add(className));
export const removeCSSClassAll = (elements: Element[], className: string) => elements.forEach((n) => n.classList.remove(className));

export const isTagString = (val: any) => typeof val === 'string' && val[0] === '#';
// '#text' => 'text'
export const getTagText = (val: string) => val.slice(1);

// function to execute once application bootstrap
export const registerCustomCSSClass = (
  searchNodesFn: () => Element[],
  cssClassName: string,
  maintainConditionFn: (e: Element) => boolean,
) => {
  // for first view
  let foundElements = searchNodesFn();
  addCSSClassAll(foundElements, cssClassName);
  // for editing result
  const updateFn = () => {
    removeCSSClassAll(
      foundElements.filter((e) => !maintainConditionFn(e)),
      cssClassName,
    );
    foundElements = searchNodesFn();
    addCSSClassAll(foundElements, cssClassName);
  };
  setInterval(updateFn, cssClassUpdateInterval);
};
