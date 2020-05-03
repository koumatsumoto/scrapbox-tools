/**
 * @jest-environment jest-environment-happy-dom
 */

import { none, some } from 'fp-ts/es6/Option';
import { getPromiseStatus } from '../../common/test-helpers/async';
import { SxDialog } from './dialog.component';

describe('DialogComponent', () => {
  let elem: SxDialog<any>;
  let dialog: {
    showModal: Function;
    close: Function;
    appendChild: Function;
  };

  beforeEach(() => {
    elem = new SxDialog();
  });

  describe('ok and cancel', () => {
    beforeEach(() => {
      dialog = {
        showModal: jest.fn(),
        close: jest.fn(),
        appendChild: jest.fn(),
      };
      expect((elem as any).dialog).toBeTruthy();
      (elem as any).dialog = dialog;
    });

    test('result with ok', async () => {
      const promise = elem.open();
      expect(await getPromiseStatus(promise)).toBe('pending');
      elem.ok('result');
      expect(await getPromiseStatus(promise)).toBe('resolved');
      expect(await promise).toEqual(some('result'));
    });

    test('result with cancel', async () => {
      const promise = elem.open();
      expect(await getPromiseStatus(promise)).toBe('pending');
      elem.cancel();
      expect(await getPromiseStatus(promise)).toBe('resolved');
      expect(await promise).toEqual(none);
    });
  });

  test('can set content element', () => {
    const div = document.createElement('div');
    elem.setContent(div);

    const found = elem.querySelector('div');
    expect(found).toBe(div);
  });
});
