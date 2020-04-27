const updateDatasetOne = <E extends HTMLElement = HTMLElement>(element: E, dataname: string, value: string) => {
  element.dataset[dataname] = value;

  return element;
};

const updateDatasetAll = <E extends HTMLElement = HTMLElement>(elements: E[], dataname: string, value: string) => {
  elements.forEach((e) => updateDatasetOne(e, dataname, value));

  return elements;
};

// to def overload
type UpdateDatasetFn = {
  <E extends HTMLElement>(target: E, dataname: string, value: string): E;
  <E extends HTMLElement>(target: E[], dataname: string, value: string): E[];
};

export const updateDataset: UpdateDatasetFn = <E extends Element>(target: any, dataname: string, value: string) =>
  Array.isArray(target) ? updateDatasetAll(target, dataname, value) : updateDatasetOne(target, dataname, value);
