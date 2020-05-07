export const alertOnFail = async (fn: () => Promise<any>) => {
  try {
    await fn();
  } catch (e) {
    alert(e);
  }
};
