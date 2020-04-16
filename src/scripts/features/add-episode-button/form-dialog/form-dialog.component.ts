import { removeElement } from '../../../../libs/common/dom';
import { TagOption } from '../config';
import { addWord, removeWord, splitWords } from './textarea-operation';
const html = require('./form-dialog.component.html');

type CustomDialogResult<T> = { ok: false } | { ok: true; data: T };

const makeCheckboxesHTML = (tagOptions: TagOption[]) => {
  let labelId = 0;

  return tagOptions
    .map((group) => {
      const inputs = group
        .map((obj) => {
          const id = `tag-${labelId++}`;
          const value = obj.value;

          return `<input id="${id}" type="checkbox" name="tags" value="${value}"><label for="${id}">${value}</label>`;
        })
        .join('');

      return `<div class="tag-group">${inputs}</div>`;
    })
    .join('');
};

const showingIndicatorCSS = '-showing-indicator'; // used in css

export class MyTagFormDialog extends HTMLElement {
  // whether form submitted or canceled
  readonly result: Promise<CustomDialogResult<string[]>>;

  // used in css also
  static readonly elementName = 'add-episode-form-dialog';
  private dialog: HTMLDialogElement;
  private form: HTMLFormElement;
  private checkboxContainer: HTMLDivElement;
  private textInput: HTMLInputElement;
  private loadingIndicatorContainer: HTMLDivElement;

  constructor(tagOptions: TagOption[] = []) {
    super();

    this.innerHTML = `${html}`;
    this.dialog = this.querySelector<HTMLDialogElement>('dialog')!;
    this.form = this.querySelector<HTMLFormElement>('form')!;
    this.textInput = this.querySelector<HTMLInputElement>('input[type=text]')!;
    this.loadingIndicatorContainer = this.querySelector<HTMLDivElement>('.loading-indicator-container')!;

    // construct DOM of checkboxes
    this.checkboxContainer = this.querySelector<HTMLDivElement>('#checkboxContainer')!;
    this.checkboxContainer.innerHTML = makeCheckboxesHTML(tagOptions);
    for (const e of this.querySelectorAll<HTMLInputElement>('input[type=checkbox]')) {
      e.addEventListener('change', () => {
        if (e.checked) {
          addWord(e.value, this.textInput);
          this.textInput.value = this.textInput.value + ' ';
        } else {
          removeWord(e.value, this.textInput);
        }
      });
    }

    // button handling
    const cancelButton = this.querySelector<HTMLButtonElement>('button[value=cancel]')!;
    const submitButton = this.querySelector<HTMLButtonElement>('button[value=default]')!;
    this.result = new Promise<CustomDialogResult<string[]>>((resolve) => {
      submitButton.addEventListener(
        'click',
        (ev) => {
          ev.preventDefault();
          resolve({ ok: true, data: splitWords(this.textInput.value) });
        },
        { once: true },
      );
      cancelButton.addEventListener(
        'click',
        (ev) => {
          ev.preventDefault();
          resolve({ ok: false });
        },
        { once: true },
      );
    });
  }

  open() {
    this.dialog.showModal();

    return this.result;
  }

  close() {
    this.dialog.close();
    removeElement(this);
  }

  // call before api request
  showLoadingIndicator() {
    this.classList.add(showingIndicatorCSS);
  }
}
