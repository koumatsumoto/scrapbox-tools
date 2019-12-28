const html = require('./my-debug-board.component.html');

export class MyDebugBoard extends HTMLElement {
  static readonly elementName = 'my-debug-board';
  private displayElement: HTMLDivElement | null = null;

  constructor() {
    super();
    this.innerHTML = `${html}`;
  }

  connectedCallback() {
    this.displayElement = this.querySelector<HTMLDivElement>('div');
  }

  updateText(text: string) {
    if (!this.displayElement) {
      return;
    }

    this.displayElement.textContent = text;
  }
}
