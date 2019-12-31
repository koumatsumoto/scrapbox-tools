const html = require('./my-debug-board.component.html');

const cssClassNameWhenTextBlockHasValue = '-has-value';

export class MyDebugBoard extends HTMLElement {
  static readonly elementName = 'my-debug-board';
  private leftTextBlock: HTMLDivElement | null = null;
  private rightTextBlock: HTMLDivElement | null = null;
  private closeButton: HTMLButtonElement | null = null;

  constructor() {
    super();
    this.setupElements();
  }

  setText(text: string, column: 'left' | 'right' = 'left') {
    const target = column === 'left' ? this.leftTextBlock : this.rightTextBlock;

    if (!target) {
      return;
    }

    target.textContent = text;
    if (text.length) {
      target.classList.add(cssClassNameWhenTextBlockHasValue);
    } else {
      target.classList.remove(cssClassNameWhenTextBlockHasValue);
    }
  }

  private setupElements() {
    this.innerHTML = `${html}`;
    const textBlocks = this.querySelectorAll<HTMLDivElement>('div');
    this.leftTextBlock = textBlocks[0]!;
    this.rightTextBlock = textBlocks[1]!;
    this.closeButton = this.querySelector<HTMLButtonElement>('button')!;
    this.closeButton.addEventListener('click', () => this.destroy(), { once: true });
  }

  private destroy() {
    this.parentNode!.removeChild(this);
  }
}
