import { removeElement } from '../../../libs/common/dom';
import { TagOption } from '../config';

const html = require('./my-tag-form-dialog.component.html');

type CustomDialogResult<T> = { ok: false } | { ok: true; data: T };

export class MyTagFormDialog extends HTMLElement {
  static readonly elementName = 'my-tag-form-dialog';
  private dialogElement: HTMLDialogElement;
  private checkboxesContainerElement: HTMLDivElement;
  private formElement: HTMLFormElement;
  // for checkbox id
  private labelId = 0;
  private dialogCloseResult: Promise<CustomDialogResult<string[]>>;

  constructor(tagOptions: TagOption[]) {
    super();

    this.innerHTML = `${html}`;
    this.dialogElement = this.querySelector<HTMLDialogElement>('dialog')!;
    this.formElement = this.querySelector<HTMLFormElement>('form')!;
    // construct DOM of checkboxes
    this.checkboxesContainerElement = this.querySelector<HTMLDivElement>('div.checkboxes')!;
    this.checkboxesContainerElement.innerHTML = this.makeCheckboxesHTML(tagOptions);
    // button handling
    const cancelButton = this.querySelector<HTMLButtonElement>('button[value=cancel]')!;
    const submitButton = this.querySelector<HTMLButtonElement>('button[value=default]')!;
    this.dialogCloseResult = new Promise<CustomDialogResult<string[]>>((resolve, reject) => {
      submitButton.addEventListener(
        'click',
        () => {
          const values = this.retrieveFormValues();
          resolve({ ok: true, data: values });
          this.dialogElement.close();
          removeElement(this);
        },
        { once: true },
      );
      cancelButton.addEventListener(
        'click',
        () => {
          resolve({ ok: false });
          this.dialogElement.close();
          removeElement(this);
        },
        { once: true },
      );
    });
  }

  open() {
    this.dialogElement.showModal();

    return this.dialogCloseResult;
  }

  private makeCheckboxesHTML(tagOptions: TagOption[]) {
    return tagOptions
      .map((group) => {
        const inputs = group
          .map((obj) => {
            const id = `usd-${this.labelId++}`;
            const value = obj.value;

            return `<input id="${id}" type="checkbox" name="tags" value="${value}"><label for="${id}">${value}</label>`;
          })
          .join('');

        return `<div class="tag-group">${inputs}</div>`;
      })
      .join('');
  }

  private retrieveFormValues() {
    const formData = new FormData(this.formElement);
    const checked = formData.getAll('tags') as string[];

    return checked.filter((str) => 0 < str.length);
  }
}
