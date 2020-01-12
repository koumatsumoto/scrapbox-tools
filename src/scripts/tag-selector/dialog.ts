import { getElementOrFail, removeElement } from '../../libs/common';
import { TagOption } from './config';

// use for mutex
const dialogId = 'dialog-for-user-script';
const inputName = 'tags';

/**
 * create html like below
 *
 * ```
 * <div class="tag-group">
 *   <input>...
 * </div>
 * ```
 */
let labelId = 0;
const makeCheckboxesHTML = (tagOptions: TagOption[]) => {
  return tagOptions
    .map((group) => {
      const inputs = group
        .map((obj) => {
          const id = `usd-${labelId++}`;
          const value = obj.value;

          return `<input id="${id}" type="checkbox" name="${inputName}" value="${value}"><label for="${id}">${value}</label>`;
        })
        .join('');

      return `<div class="tag-group">${inputs}</div>`;
    })
    .join('');
};

const menuHTML = `<menu><button value="cancel">Cancel</button><button value="default">Copy</button></menu>`;

const makeFormHTML = (checkboxesHTML: string, menuHTML: string) => `<form method="dialog"><div>${checkboxesHTML}</div>${menuHTML}</form>`;

export const makeDialogInnerHTML = (checkboxValues: TagOption[]) => makeFormHTML(makeCheckboxesHTML(checkboxValues), menuHTML);

const isDialogExist = () => document.querySelector(`#${dialogId}`);

type CustomDialogResult<T> = { ok: false } | { ok: true; data: T };

export const retrieveFormValues = (dialog: HTMLDialogElement) => {
  const form = getElementOrFail<HTMLFormElement>('form', dialog);
  const formData = new FormData(form);
  const checked = formData.getAll(inputName) as string[];

  return checked.filter((str) => 0 < str.length);
};

const waitForDialogClose = (dialog: HTMLDialogElement): Promise<CustomDialogResult<string[]>> => {
  return new Promise((resolve, reject) => {
    try {
      const cancelButton = getElementOrFail<HTMLFormElement>('button[value=cancel]', dialog);
      const submitButton = getElementOrFail<HTMLFormElement>('button[value=default]', dialog);

      const handleCancel = () => {
        resolve({ ok: false });
        dialog.close();
      };
      const handleSubmit = () => {
        resolve({ ok: true, data: retrieveFormValues(dialog) });
        dialog.close();
      };

      cancelButton.addEventListener('click', handleCancel, { once: true });
      submitButton.addEventListener('click', handleSubmit, { once: true });
    } catch (e) {
      reject(e);
    }
  });
};

export const appendDialogToDOMOrFail = (checkboxValues: TagOption[]) => {
  if (isDialogExist()) {
    throw new Error('dialog already exists');
  }

  const dialog = document.createElement('DIALOG') as HTMLDialogElement;
  dialog.id = dialogId;
  dialog.innerHTML = makeDialogInnerHTML(checkboxValues);
  document.body.appendChild(dialog);

  return dialog;
};

export const openDialog = async (param: { tagOptions: TagOption[] }) => {
  const dialog = appendDialogToDOMOrFail(param.tagOptions);
  dialog.showModal();

  const result = await waitForDialogClose(dialog);
  removeElement(dialog);

  return result;
};
