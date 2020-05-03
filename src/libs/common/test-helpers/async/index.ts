// to test rx streams
export const nextTick = (fn: Function) => setTimeout(fn);

type Status = 'pending' | 'resolved' | 'rejected';
export const getPromiseStatus = async (promise: Promise<any>): Promise<Status> => {
  let status: Status = 'pending';

  await Promise.race([
    promise.then(
      () => (status = 'resolved'),
      () => (status = 'rejected'),
    ),
    Promise.resolve(),
  ]);

  return status;
};
