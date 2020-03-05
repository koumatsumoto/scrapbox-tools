import { MyIcon, SupportedIcon } from '../my-icon/my-icon.component';

const html = require('./my-console-button.component.html');
type Action = () => unknown;

export class MyConsoleButton extends HTMLElement {
  static readonly elementName = 'my-console-button';
  private action: Action = () => {
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

  setState(param: { icon?: SupportedIcon; action?: Action }) {
    if (param.icon) {
      this.icon.type = param.icon;
    }
    if (param.action) {
      this.action = param.action;
    }
  }

  connectedCallback() {
    this.addEventListener('click', () => this.action());
  }

  disconnectedCallback() {
    this.removeEventListener('click', () => this.action());
  }
}
