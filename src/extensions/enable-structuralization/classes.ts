import { removeHead } from '../../util';
import { getSectionCSSClass } from '../../util/scrapbox/scrapbox-dom-manipulator';

export const maxSupportedLineNumber = 20000;

export type LineObject = {
  id: string;
  sectionNumber: number;
  text: string;
  telomereLength: string;
};

export const getCSSClassInvalidError = () => new Error('css class is invalid');

const getSectionNumber = (element: Element) => {
  for (let i = 0; ; i++) {
    if (element.classList.contains(getSectionCSSClass(i))) {
      return i;
    }

    if (i > maxSupportedLineNumber) {
      throw getCSSClassInvalidError();
    }
  }
};

export const parseLine = (line: Element): LineObject => {
  try {
    const id = removeHead(line.id);
    const sectionNumber = getSectionNumber(line);
    const telomereEle = line.querySelector('.telomere')! as HTMLElement;
    const telomereLength = telomereEle.style.borderRight;
    const textElm = line.querySelector('.text')!;
    const text = textElm.textContent || '';

    return {
      id,
      sectionNumber,
      text,
      telomereLength,
    };
  } catch (e) {
    throw getCSSClassInvalidError();
  }
};

/**
   <div
    class="line section-0"
    id="L5deb14496a04390017ea793f">
    <div class="telomere desktop-telomere">
      <a
        href="#5deb14496a04390017ea793f"
        class="telomere-border"
        tabindex="-1"
        style="border-width: 0px 0px 0px 8px;"
      ></a>
    </div>
    <span class="text"
      ><span class="c-0">開</span><span class="c-1">発</span
      ><span class="c-2">サ</span><span class="c-3">ン</span
      ><span class="c-4">プ</span><span class="c-5">ル</span
      ><span class="c-6">1</span></span
    >
   </div>
 */
export class Line {
  private readonly raw: Element;
  readonly data: LineObject;

  constructor(element: Element) {
    this.raw = element;
    this.data = parseLine(element);
  }
}

export class Tag {
  // '#tag-name'
  readonly raw: string;
  // 'tag-name'
  readonly name: string;

  constructor(raw: string, name: string) {
    this.raw = raw;
    this.name = name;
  }
}

export class Meta {
  readonly line: Line;

  constructor(element: Line) {
    this.line = element;
  }
}

export class ValidBlock {
  readonly meta: Meta;
  readonly symbol: Line;
  readonly text: Line[] = [];

  constructor(meta: Meta, symbol: Line, text: Line[]) {
    this.meta = meta;
    this.symbol = symbol;
    this.text = text;
  }
}

export class InvalidBlock {
  readonly meta?: Meta;
  readonly symbol?: Line;
  readonly text?: Line[] = [];

  constructor(meta?: Meta, symbol?: Line, text?: Line[]) {
    if (meta) {
      this.meta = meta;
    }
    if (symbol) {
      this.symbol = symbol;
    }
    if (text) {
      this.text = text;
    }
  }
}

export type Block = ValidBlock | InvalidBlock;

export class Container {
  readonly blocks: Block[];

  constructor(blocks: Block[]) {
    this.blocks = blocks;
  }
}

export class Page {
  readonly title: Line;
  readonly container: Container;

  constructor(title: Line, container: Container) {
    this.title = title;
    this.container = container;
  }
}
