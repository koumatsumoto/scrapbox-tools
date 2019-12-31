const html = require('./my-debug-board.component.html');

const cssClassNameWhenTextBlockHasValue = '-has-value';

type TextBlocks = {
  'left-top': HTMLDivElement | null;
  'left-bot': HTMLDivElement | null;
  'right-top': HTMLDivElement | null;
  'right-bot': HTMLDivElement | null;
};

export class MyDebugBoard extends HTMLElement {
  static readonly elementName = 'my-debug-board';
  private leftSection: HTMLElement | null = null;
  private rightSection: HTMLElement | null = null;
  private textBlocks!: TextBlocks;
  private closeButton: HTMLButtonElement | null = null;

  constructor() {
    super();
    this.setupElements();
  }

  setText(text: string, col: keyof TextBlocks = 'left-top') {
    const target = this.textBlocks[col];
    const section = col === 'left-top' || 'left-bot' ? this.leftSection : this.rightSection;
    if (!target || !section) {
      return;
    }

    target.textContent = text;
    this.updateCSSClass();
  }

  private setupElements() {
    this.innerHTML = `${html}`;
    const sections = this.querySelectorAll<HTMLElement>('section');
    const textBlocks = this.querySelectorAll<HTMLDivElement>('div');
    this.textBlocks = {
      'left-top': textBlocks[0],
      'left-bot': textBlocks[1],
      'right-top': textBlocks[2],
      'right-bot': textBlocks[3],
    };
    this.leftSection = sections[0]!;
    this.rightSection = sections[1]!;
    this.closeButton = this.querySelector<HTMLButtonElement>('button')!;
    this.closeButton.addEventListener('click', () => this.destroy(), { once: true });
    this.updateCSSClass();
  }

  private updateCSSClass() {
    for (const e of Object.values(this.textBlocks)) {
      if (e && !!e.textContent) {
        e.classList.add(cssClassNameWhenTextBlockHasValue);
      }
    }

    for (const e of [this.leftSection, this.rightSection]) {
      if (e) {
        if (e.getElementsByClassName(cssClassNameWhenTextBlockHasValue).length) {
          e.classList.add(cssClassNameWhenTextBlockHasValue);
        } else {
          e.classList.remove(cssClassNameWhenTextBlockHasValue);
        }
      }
    }
  }

  private destroy() {
    this.parentNode!.removeChild(this);
  }
}
