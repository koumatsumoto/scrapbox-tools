import { getElements } from '../../libs/common';
import { checkHTML, setupBodyForTest } from '../../test-helpers';
import { appendDialogToDOMOrFail, makeDialogInnerHTML, openDialog, retrieveFormValues } from './dialog';

describe('dialogs', () => {
  beforeEach(() => {
    setupBodyForTest();
  });

  describe('makeDialogInnerHTML', () => {
    it('should make valid html', () => {
      const html = makeDialogInnerHTML(['tag1', 'tag2']);
      expect(checkHTML(html)).toBeTruthy();
    });
  });

  describe('appendDialogToDOMOrFail', () => {
    it('should update DOM with created dialog', () => {
      appendDialogToDOMOrFail(['tag1', 'tag2']);
      expect(document.body.querySelector('dialog')).toBeTruthy();
      expect(document.body.querySelector('input[value="tag1"]')).toBeTruthy();
      expect(document.body.querySelector('input[value="tag2"]')).toBeTruthy();
    });

    it('should throw if other dialog exists', () => {
      expect(() => appendDialogToDOMOrFail(['tag1', 'tag2'])).not.toThrow();
      expect(() => appendDialogToDOMOrFail(['tag3', 'tag4'])).toThrow();
    });
  });

  describe('retrieveFormValues', () => {
    it('retrieve checked values', () => {
      const dialog = appendDialogToDOMOrFail(['tag1', 'tag2']);
      const inputs = getElements<HTMLInputElement>('input', dialog);

      // no checkbox selected
      expect(retrieveFormValues(dialog)).toEqual([]);
      // all checkbox selected
      inputs.forEach((e) => (e.checked = true));
      expect(retrieveFormValues(dialog)).toEqual(['tag1', 'tag2']);
    });
  });

  describe('openDialog', () => {
    it('should be executable', () => {
      expect(() => openDialog({ tagOptions: [] })).not.toThrow();
    });
  });
});
