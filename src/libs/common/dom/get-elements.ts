export const findElementOrFail = <T extends Element>(selector: string, parent: ParentNode = document) => {
  const elem = parent.querySelector<T>(selector);
  if (!elem) {
    throw new Error('Element not found');
  }

  return elem;
};

export const findElement = <T extends Element>(selector: string, parent: ParentNode = document) => {
  return parent.querySelector<T>(selector);
};

// TODO: rename to findElements
export const getElements = <T extends Element>(selector: string, parent: ParentNode = document) =>
  Array.from(parent.querySelectorAll<T>(selector));
