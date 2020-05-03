import { none, Option, some } from 'fp-ts/es6/Option';
import { removeElement } from '../../common/dom';

export class SxDialog<V> extends HTMLElement {
  static elementName = 'sx-dialog';
  // whether form submitted or canceled
  private readonly result: Promise<Option<V>>;
  private readonly dialog: HTMLDialogElement;
  private resolve!: (v: Option<V>) => void;

  constructor() {
    super();

    this.innerHTML = '<dialog></dialog>';
    this.dialog = this.querySelector<HTMLDialogElement>('dialog')!;
    this.result = new Promise<Option<V>>((resolve) => (this.resolve = resolve));
  }

  open() {
    this.dialog.showModal();

    return this.result;
  }

  ok(value: V) {
    this.resolve(some(value));
    this.close();
  }

  cancel() {
    this.resolve(none);
    this.close();
  }

  setContent(element: HTMLElement) {
    this.dialog.innerHTML = ''; // reset
    this.dialog.appendChild(element);
  }

  private close() {
    this.dialog.close();
    removeElement(this);
  }
}
