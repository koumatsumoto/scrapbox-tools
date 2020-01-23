export const sleep = (time: number) =>
  new Promise<void>((resolve, reject) => {
    if (!Number.isFinite(time)) {
      return reject(new Error('Time must be finite number'));
    }

    setTimeout(resolve, time);
  });
