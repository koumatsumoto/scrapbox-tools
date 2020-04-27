import { compact, map } from 'fp-ts/es6/Array';
import { pipe } from 'fp-ts/es6/pipeable';
import { findElementById, updateDataset } from '../../../../libs/common/dom';
import { Line, Memory } from '../types';

// id to dom starts with 'L' char because raw line-id can start with number char (it's invalid for dom)
const toDOMId = (lineId: string) => `L` + lineId;

export const colorLines = (lines: Line[], key: string, colorType: string) =>
  pipe(
    // Line object
    lines,
    // ID strings to specify dom
    map((line) => toDOMId(line.id)),
    // Elements optional
    map((id) => findElementById(id)),
    // Elements existing
    compact,
    // side-effect
    // TODO(2020-04027): use function to execute side-effect rather than map
    map((elem) => updateDataset(elem, key, colorType)),
  );

// for background color for each child episode block
const getColorTypeGen = () => {
  let idx = 0;

  return () => {
    return `type-${idx++ % 10}`;
  };
};

// [data-sx-child-episode-line]
const colorDatasetKey = 'sxChildEpisodeLine';

export const colorChildEpisodeLines = (memory: Memory) => {
  const colorTypeGen = getColorTypeGen();
  memory.episodes
    .filter((ep) => ep.children.length)
    .forEach((ep) => {
      ep.children.forEach((child) => {
        // change color type by child episode
        const colorType = colorTypeGen();
        colorLines([child.headline, ...child.lines], colorDatasetKey, colorType);
      });
    });
};
