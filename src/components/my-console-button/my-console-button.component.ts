import { MyIcon, SupportedIcon } from '../my-icon/my-icon.component';

const html = require('./my-console-button.component.html');

export class MyConsoleButton extends HTMLElement {
  static readonly elementName = 'my-console-button';
  private action: () => unknown = () => {
    /* nothing */
  };

  private readonly icon!: MyIcon;

  constructor() {
    super();
    this.innerHTML = `${html}`;

    const icon = this.querySelector<MyIcon>('my-icon');
    if (!icon) {
      throw new Error('Invalid Template');
    }
    this.icon = icon;
  }

  setIcon(iconName: SupportedIcon) {
    this.icon.type = iconName;
  }

  setAction(action: () => unknown) {
    this.action = action;
  }

  connectedCallback() {
    this.addEventListener('click', () => this.action());
  }

  disconnectedCallback() {
    this.removeEventListener('click', () => this.action());
  }
}
