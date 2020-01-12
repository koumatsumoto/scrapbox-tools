import { openDialogAndSelectTags } from '../../scripts/tag-selector';

const html = require('./my-console-button.component.html');

export class MyConsoleButton extends HTMLElement {
  static readonly elementName = 'my-console-button';

  constructor() {
    super();
    this.innerHTML = `${html}`;
  }

  connectedCallback() {
    this.addEventListener('click', this.openDialog);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.openDialog);
  }

  private async openDialog() {
    await openDialogAndSelectTags();
  }
}
