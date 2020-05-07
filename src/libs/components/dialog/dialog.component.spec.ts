/**
 * @jest-environment jest-environment-happy-dom
 */

import { SxDialogComponent } from './dialog.component';

describe('SxDialogComponent', () => {
  let elem: SxDialogComponent;

  beforeEach(() => {
    elem = new SxDialogComponent();
  });

  test('can set content element', () => {
    const div = document.createElement('div');
    elem.setContent(div);

    const found = elem.querySelector('div');
    expect(found).toBe(div);
  });
});
