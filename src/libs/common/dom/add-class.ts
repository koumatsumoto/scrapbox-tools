const addClassOne = (element: Element, className: string) => element.classList.add(className);
const addClassAll = (elements: Element[], className: string) => elements.forEach((e) => addClassOne(e, className));

export const addClass = (target: Element | Element[], className: string) =>
  Array.isArray(target) ? addClassAll(target, className) : addClassOne(target, className);
