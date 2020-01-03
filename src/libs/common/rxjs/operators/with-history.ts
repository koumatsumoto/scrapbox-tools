import { Observable } from 'rxjs';
import { getRx } from '../index';

export const withHistory = (n: number) => <T>(source: Observable<T>) => {
  const { Observable } = getRx();

  return new Observable<T[]>((subscriber) => {
    const values: T[] = [];
    return source.subscribe({
      next(x: T) {
        values.push(x);

        if (values.length > n) {
          values.shift();
          subscriber.next([...values]);
        } else if (values.length < n) {
          return;
        } else {
          subscriber.next([...values]);
        }
      },
      error(err: Error) {
        subscriber.error(err);
      },
      complete() {
        subscriber.complete();
      },
    });
  });
};
