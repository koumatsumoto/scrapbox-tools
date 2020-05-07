import { removeElement } from '../../common/dom';

export class SxDialogComponent extends HTMLElement {
  static elementName = 'sx-dialog';
  private readonly dialog: HTMLDialogElement;

  constructor() {
    super();

    this.innerHTML = '<dialog></dialog>';
    this.dialog = this.querySelector<HTMLDialogElement>('dialog')!;

    // also used by closing with ESC key
    this.dialog.addEventListener('close', () => removeElement(this), { once: true });
  }

  open() {
    if (this.dialog.open) {
      return;
    }

    if (this.parentNode === null) {
      document.body.appendChild(this);
    }

    this.dialog.showModal();
  }

  close() {
    if (this.dialog.open) {
      this.dialog.close();
    }
  }

  setContent(element: HTMLElement) {
    this.dialog.innerHTML = ''; // reset
    this.dialog.appendChild(element);
  }
}
