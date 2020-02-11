// TODO: rename to findElementOrFail
export const getElementOrFail = <T extends Element>(selector: string, parent: ParentNode = document) => {
  const elem = parent.querySelector<T>(selector);
  if (!elem) {
    throw new Error('Element not found');
  }

  return elem;
};

// TODO: rename to findElements
export const getElements = <T extends Element>(selector: string, parent: ParentNode = document) =>
  Array.from(parent.querySelectorAll<T>(selector));
