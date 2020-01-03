import { Subject } from 'rxjs';
import { skip } from 'rxjs/operators';
import { nextTick } from '../../test-helpers';
import { withHistory } from './with-history';

describe('withHistory', () => {
  it('should emit after 3 items arrived', (done: Function) => {
    const $ = new Subject<number>();

    nextTick(() => {
      $.next(1);
      $.next(2);
      $.next(3);
    });

    $.pipe(withHistory(3)).subscribe((v) => {
      expect(v).toEqual([1, 2, 3]);
      done();
    });
  });

  it('should emit latest 3', (done: Function) => {
    const $ = new Subject<number>();

    nextTick(() => {
      $.next(1);
      $.next(2);
      $.next(3);
      $.next(4);
    });

    $.pipe(withHistory(3), skip(1)).subscribe((v) => {
      expect(v).toEqual([2, 3, 4]);
      done();
    });
  });
});
