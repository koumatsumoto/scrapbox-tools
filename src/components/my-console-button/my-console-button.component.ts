import { openDialogAndSelectTags } from '../../scripts/copy-tag-text';

const html = `
<button>
  <my-icon type="view_modules" size="30"></my-icon>
</button>
`;

export class MyConsoleButton extends HTMLElement {
  static elementName = 'my-console-button';

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
