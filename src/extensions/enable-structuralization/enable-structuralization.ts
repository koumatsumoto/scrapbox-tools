import { customCSSClassName } from '../../constants';
import { isEmptyDoubleDimensionalArray } from '../../util/common';
import { ScrapboxDomManipulator } from '../../util/scrapbox';
import { Block, Container, InvalidBlock, Line, Meta, Page } from './classes';

const cssClass = {
  title: 'us-structure-title',
  block: 'us-structure-block',
  meta: 'us-structure-meta',
  symbol: 'us-structure-symbol',
  texts: 'us-structure-texts',
};

export const createBlock = (lines: Element[]) => {
  let meta: Meta | undefined;
  let symbol: Line | undefined;
  const text: Line[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = new Line(lines[i]);

    // tags line
    if (i === 0) {
      meta = new Meta(line);
    } else if (i === 1) {
      symbol = line;
    } else {
      text.push(line);
    }
  }

  return new InvalidBlock(meta, symbol, text);
};

export const getPage = () => {
  const sections = ScrapboxDomManipulator.getLinesGroupBySectionNumber();
  if (isEmptyDoubleDimensionalArray(sections)) {
    return;
  }

  // first section includes title
  const title = new Line(sections[0].shift()!);
  const blocks: Block[] = [];
  sections.forEach((lines) => blocks.push(createBlock(lines)));

  const container = new Container(blocks);

  return new Page(title, container);
};

export const enableLineStructualization = () => {
  const page = getPage();

  console.log('[extensions] page', page);
};
