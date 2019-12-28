export const registerElementManagement = (param: {
  searchFn: () => HTMLElement[];
  watchCondition: (e: HTMLElement) => boolean;
  onFirstCheck: (e: HTMLElement) => any;
  onRemove: (e: HTMLElement) => any;
  checkInterval: number;
}) => {
  let manageTarget = param.searchFn();
  manageTarget.forEach((e) => {
    param.onFirstCheck(e);
    e.dataset.checked = 'true';
  });

  setInterval(() => {
    const removeTarget = manageTarget.filter((e) => !param.watchCondition(e));
    removeTarget.forEach((e) => {
      e.dataset.checked = undefined;
      param.onRemove(e);
    });

    manageTarget = param.searchFn();
    manageTarget.forEach((e) => {
      if (!e.dataset.checked) {
        param.onFirstCheck(e);
        e.dataset.checked = 'true';
      }
    });
  }, param.checkInterval);
};
