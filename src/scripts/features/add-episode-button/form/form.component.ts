import { DynamicConfig } from '../../../config';
import { makeCheckboxesHTML } from './make-checkbox-html';
import { addWord, removeWord, splitWords } from './textarea-operation';

const html = require('./form.component.html');

// null if form canceled
type FormResult = string[] | null;

export class SxAddEpisodeFormComponent extends HTMLElement {
  // whether form submitted or canceled
  readonly result: Promise<FormResult>;

  // used in css also
  static readonly elementName = 'sx-add-episode-form';
  private form: HTMLFormElement;
  private checkboxContainer: HTMLDivElement;
  private textInput: HTMLInputElement;

  constructor(tagOptions: DynamicConfig['tags'] = []) {
    super();

    this.innerHTML = `${html}`;
    this.form = this.querySelector<HTMLFormElement>('form')!;
    this.textInput = this.querySelector<HTMLInputElement>('input[type=text]')!;

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
    this.result = new Promise<FormResult>((resolve) => {
      submitButton.addEventListener(
        'click',
        (ev) => {
          ev.preventDefault();
          resolve(splitWords(this.textInput.value));
        },
        { once: true },
      );
      cancelButton.addEventListener(
        'click',
        (ev) => {
          ev.preventDefault();
          resolve(null);
        },
        { once: true },
      );
    });
  }
}
