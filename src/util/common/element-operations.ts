export const removeElement = (element: Element) => {
  if (!element.parentNode) {
    throw new Error('parent node is not found');
  }

  element.parentNode.removeChild(element);
};
