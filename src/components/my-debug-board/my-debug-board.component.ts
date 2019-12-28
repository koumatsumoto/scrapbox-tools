const html = require('./my-debug-board.component.html');

export class MyDebugBoard extends HTMLElement {
  static readonly elementName = 'my-debug-board';
  private screenElement: HTMLDivElement | null = null;
  private closeButton: HTMLButtonElement | null = null;

  constructor() {
    super();
    this.setupElements();
  }

  updateText(text: string) {
    if (!this.screenElement) {
      return;
    }

    this.screenElement.textContent = text;
  }

  private setupElements() {
    this.innerHTML = `${html}`;
    this.screenElement = this.querySelector<HTMLDivElement>('div')!;
    this.closeButton = this.querySelector<HTMLButtonElement>('button')!;
    this.closeButton.addEventListener('click', () => this.destroy(), { once: true });
  }

  private destroy() {
    this.parentNode!.removeChild(this);
  }
}
