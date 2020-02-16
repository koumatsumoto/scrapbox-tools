import { getElements } from '../../libs/common';
import { checkHTML, setupBodyForTest } from '../../test-helpers';
import { tagOptions } from './config';
import { appendDialogToDOMOrFail, makeDialogInnerHTML, openDialog, retrieveFormValues } from './dialog';

describe('dialogs', () => {
  beforeEach(() => {
    setupBodyForTest();
  });

  describe('makeDialogInnerHTML', () => {
    it('should make valid html', () => {
      const html = makeDialogInnerHTML(tagOptions);
      expect(checkHTML(html)).toBeTruthy();
    });
  });

  describe('appendDialogToDOMOrFail', () => {
    it('should update DOM with created dialog', () => {
      appendDialogToDOMOrFail(tagOptions);
      expect(document.body.querySelector('dialog')).toBeTruthy();
      expect(document.body.querySelector('input[value]')).toBeTruthy();
    });

    it('should throw if other dialog exists', () => {
      expect(() => appendDialogToDOMOrFail(tagOptions)).not.toThrow();
      expect(() => appendDialogToDOMOrFail(tagOptions)).toThrow();
    });
  });

  describe('retrieveFormValues', () => {
    it('retrieve checked values', () => {
      const dialog = appendDialogToDOMOrFail(tagOptions);
      const inputs = getElements<HTMLInputElement>('input', dialog);

      // no checkbox selected
      expect(retrieveFormValues(dialog)).toEqual([]);
      // all checkbox selected
      inputs.forEach((e) => (e.checked = true));
      expect(retrieveFormValues(dialog)).toEqual(tagOptions.flatMap((group) => group.map((option) => option.value)));
    });
  });

  describe('openDialog', () => {
    it('should be executable', () => {
      expect(() => openDialog({ tagOptions: [] })).not.toThrow();
    });
  });
});
