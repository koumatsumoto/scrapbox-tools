export const removeElement = (element: Element) => {
  if (!element.parentNode) {
    return;
  }

  element.parentNode.removeChild(element);
};
