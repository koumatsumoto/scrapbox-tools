const check = (e: HTMLElement) => (e.dataset.checked = 'true');
const uncheck = (e: HTMLElement) => (e.dataset.checked = undefined);
const yetChecked = (e: HTMLElement) => e.dataset.checked === undefined;
const doSafely = (fn: (e: HTMLElement) => unknown, param: HTMLElement) => {
  try {
    fn(param);
  } catch {
    // ignore error
  }
};

export const registerElementManagement = (param: {
  targetsSelector: () => HTMLElement[];
  onFirstCheck: (e: HTMLElement) => unknown;
  clearFlagCondition?: (e: HTMLElement) => boolean;
  onRemove?: (e: HTMLElement) => unknown;
  checkInterval: number;
}) => {
  let managing: HTMLElement[] = [];

  const findAndModifyTargets = () => {
    managing = param.targetsSelector();
    managing.forEach((e) => {
      if (yetChecked(e)) {
        doSafely(param.onFirstCheck, e);
        check(e);
      }
    });
  };

  const clearFlagToReDoFirstCheckOnNextFound = () => {
    if (param.clearFlagCondition) {
      managing
        .filter((e) => param.clearFlagCondition!(e))
        .forEach((e) => {
          if (param.onRemove) {
            doSafely(param.onRemove, e);
          }
          uncheck(e);
        });
    }
  };

  // initial execution
  findAndModifyTargets();
  // interval execution
  setInterval(() => {
    clearFlagToReDoFirstCheckOnNextFound();
    findAndModifyTargets();
  }, param.checkInterval);
};
