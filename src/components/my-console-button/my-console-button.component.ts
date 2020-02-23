const html = require('./my-console-button.component.html');

export class MyConsoleButton extends HTMLElement {
  static readonly elementName = 'my-console-button';
  private action: () => unknown = () => {
    /* nothing */
  };

  constructor() {
    super();
    this.innerHTML = `${html}`;
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
