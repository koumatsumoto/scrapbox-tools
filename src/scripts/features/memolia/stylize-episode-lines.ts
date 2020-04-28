import { compact, map } from 'fp-ts/es6/Array';
import { pipe } from 'fp-ts/es6/pipeable';
import { findElementById, updateDataset } from '../../../libs/common/dom';
import { Line, Memory } from './types';

// id to dom starts with 'L' char because raw line-id can start with number char (it's invalid for dom)
const toDOMId = (lineId: string) => `L` + lineId;

export const applyDataset = (lines: Line[] | Line, key: string, value: string) =>
  pipe(
    // Line object
    Array.isArray(lines) ? lines : [lines],
    // ID strings to specify dom
    map((line) => toDOMId(line.id)),
    // Elements optional
    map((id) => findElementById(id)),
    // Elements existing
    compact,
    // side-effect
    // TODO(2020-04027): use function to execute side-effect rather than map
    map((elem) => updateDataset(elem, key, value)),
  );

const datakeys = {
  // [data-sx-child-episode-line]
  episodeHeadline: 'sxEpisodeHeadline',
  // [data-sx-child-episode-line]
  childEpisodeLine: 'sxChildEpisodeLine',
  // [data-sx-child-episode-start-line]
  childEpisodeStartLine: 'sxChildEpisodeStartLine',
  // [data-sx-child-episode-end-line]
  childEpisodeEndLine: 'sxChildEpisodeEndLine',
};

export const stylizeEpisodeLines = (memory: Memory) => {
  // style episode headline
  memory.episodes.forEach((ep) => applyDataset(ep.headline, datakeys.episodeHeadline, ''));

  // style lines of child-episode
  memory.episodes
    .filter((ep) => ep.children.length)
    .forEach((ep) => {
      ep.children.forEach((child) => {
        // stylize each line
        const allLines = [child.headline, ...child.lines];
        applyDataset(allLines, datakeys.childEpisodeLine, '');

        // stylize for line-block (border-radius and so on)
        applyDataset(allLines[0], datakeys.childEpisodeStartLine, '');
        applyDataset(allLines[allLines.length - 1], datakeys.childEpisodeEndLine, '');
      });
    });
};
