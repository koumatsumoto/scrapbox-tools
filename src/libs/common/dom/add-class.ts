const addClassOne = <E extends Element = Element>(element: E, className: string | string[]) => {
  const classes = Array.isArray(className) ? className : [className];
  element.classList.add(...classes);

  return element;
};

const addClassAll = <E extends Element = Element>(elements: E[], className: string | string[]) => {
  elements.forEach((e) => addClassOne(e, className));

  return elements;
};

// to def overload
type AddClassFn = {
  <E extends Element>(target: E, className: string | string[]): E;
  <E extends Element>(target: E[], className: string | string[]): E[];
};

export const addClass: AddClassFn = <E extends Element>(target: any, className: string | string[]) =>
  Array.isArray(target) ? addClassAll(target, className) : addClassOne(target, className);
