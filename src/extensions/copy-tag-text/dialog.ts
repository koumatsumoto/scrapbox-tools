import { getElementOrFail, removeElement } from '../../util/common';

// use for mutex
const dialogId = 'dialog-for-user-script';
const inputName = 'tags';

let labelId = 0;
const makeCheckboxesHTML = (values: string[]) =>
  values
    .map((v) => {
      const id = `usd-${labelId++}`;

      return `<input id="${id}" type="checkbox" name="${inputName}" value="${v}"><label for="${id}">${v}</label>`;
    })
    .join('');

const menuHTML = `<menu><button value="cancel">Cancel</button><button value="default">Copy</button></menu>`;

const makeFormHTML = (checkboxesHTML: string, menuHTML: string) => `<form method="dialog"><div>${checkboxesHTML}</div>${menuHTML}</form>`;

export const makeDialogInnerHTML = (checkboxValues: string[]) => makeFormHTML(makeCheckboxesHTML(checkboxValues), menuHTML);

const isDialogExist = () => document.querySelector(`#${dialogId}`);

type CustomDialogResult<T> = { ok: false } | { ok: true; data: T };

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

export const appendDialogToDOMOrFail = (checkboxValues: string[]) => {
  if (isDialogExist()) {
    throw new Error('dialog already exists');
  }

  const dialog = document.createElement('DIALOG') as HTMLDialogElement;
  dialog.id = dialogId;
  dialog.innerHTML = makeDialogInnerHTML(checkboxValues);
  document.body.appendChild(dialog);

  return dialog;
};

export const retrieveFormValues = (dialog: HTMLDialogElement) => {
  const form = getElementOrFail<HTMLFormElement>('form', dialog);
  const formData = new FormData(form);
  const checked = formData.getAll(inputName) as string[];

  return checked.filter((str) => 0 < str.length);
};

export const openDialog = async (param: { tagOptions: string[] }) => {
  const dialog = appendDialogToDOMOrFail(param.tagOptions);
  dialog.showModal();

  const result = await waitForDialogClose(dialog);
  removeElement(dialog);

  return result;
};
