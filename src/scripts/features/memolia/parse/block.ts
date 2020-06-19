import { isTagLine } from '../../../../libs/scrapbox/browser-api/scrapbox-object/line';
import { ScrapboxLine, TagLine } from '../../../../libs/scrapbox/types';
import { Memory, Name } from '../types';

export type TitleBlock = {
  of: Memory['name'];
  lines: [ScrapboxLine];
};

export type SemantemeBlock = {
  of: Memory['name'];
  lines: ScrapboxLine[];
};

export type EpisodeBlock = {
  of: Memory['name'];
  lines: { 0: TagLine } & ScrapboxLine[];
};

export type BlockParseResult = {
  title: TitleBlock;
  semanteme: SemantemeBlock | null;
  episodes: EpisodeBlock[];
};

// scrapbox.Page.lines.map((l) => ({ n: l.section.number, t: l.text }))
export const parseToBlock = (lines: ScrapboxLine[]): BlockParseResult => {
  // iteration point
  let cursor = 0;
  // head is title-line
  const titleLine = lines[cursor];
  const getSemantemeBlock = (): SemantemeBlock => ({ of: titleLine.text as Name, lines: [] });
  const getEpisodeBlock = (first: TagLine): EpisodeBlock => ({ of: titleLine.text as Name, lines: [first] });

  // title block
  const titleBlock: TitleBlock = {
    of: titleLine.text as Name,
    lines: [titleLine],
  };
  // case: page has only title-line
  if (cursor === lines.length) {
    return {
      title: titleBlock,
      semanteme: null,
      episodes: [],
    };
  }

  // semanteme block
  const semantemeBlock = getSemantemeBlock();
  for (cursor = 1; cursor < lines.length; cursor++) {
    const line = lines[cursor];
    if (isTagLine(line)) {
      break;
    } else {
      semantemeBlock.lines.push(line);
    }
  }
  // case: page not have episodes
  if (cursor === lines.length) {
    return {
      title: titleBlock,
      semanteme: semantemeBlock,
      episodes: [],
    };
  }

  // construct episode-block
  // first line is specified as tag-line above
  let block = getEpisodeBlock(lines[cursor] as TagLine);
  const blocks: EpisodeBlock[] = [];
  for (cursor++; cursor < lines.length; cursor++) {
    const line = lines[cursor];
    if (isTagLine(line)) {
      blocks.push(block);
      block = getEpisodeBlock(line);
    } else {
      block.lines.push(line);
    }
  }

  blocks.push(block);

  return {
    title: titleBlock,
    semanteme: semantemeBlock,
    episodes: blocks,
  };
};
