import { pipe } from 'fp-ts/es6/pipeable';
import { ScrapboxLine } from '../../../../libs/scrapbox/types';
import { Memory, Name } from '../types';
import { BlockParseResult, parseToBlock } from './block';
import { makeEpisode } from './episode';

// TODO: refine types
export const makeFromBlock = (blocks: BlockParseResult): Memory => {
  return {
    name: blocks.title.of as Name,
    semanteme: blocks.semanteme ? (blocks.semanteme as any) : null,
    episodes: blocks.episodes.map(makeEpisode),
  };
};

export const makeMemory = (lines: ScrapboxLine[]) => pipe(parseToBlock(lines), makeFromBlock);
