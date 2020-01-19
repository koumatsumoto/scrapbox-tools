export const waitUntil = (condition: () => boolean, checkIntervalMs: number, timeoutMs = Infinity): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    if (Number.isFinite(timeoutMs)) {
      window.setTimeout(reject, timeoutMs);
    }

    const handler = window.setInterval(() => {
      if (condition()) {
        window.clearInterval(handler);
        resolve(true);
      }
    }, checkIntervalMs);
  });
};
