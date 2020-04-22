import { TagLine } from '../../../../libs/scrapbox/types';
import { ChildEpisode, Episode } from '../types';
import { EpisodeBlock } from './block';
import { EpisodeTitleLineMetadata, makeLineWithMetadata } from './line';
import { parseTag } from './tag';

export const getContext = (line: TagLine) => parseTag(line).map((t) => t.name);

export const parseChildEpisodes = (block: EpisodeBlock): ChildEpisode[] => {
  const header = block.lines[0] as TagLine;
  const lines = block.lines.slice(1); // remove header (a tag-line)
  if (header == null || lines.length < 1) {
    return [];
  }

  const getBaseContext = () => [...getContext(header), block.of];
  const episodes = new Map<string, ChildEpisode>();
  const merge = (v: ChildEpisode) => {
    const key = [...v.context, v.for].join();
    const exist = episodes.get(key);
    if (exist) {
      episodes.set(key, { ...exist, lines: [...exist.lines, ...v.lines] });
    } else {
      episodes.set(key, v);
    }
  };

  const linesWithMeta = lines.map(makeLineWithMetadata);
  let ep: ChildEpisode | null = null;
  let parentIndentLevel = 0;

  for (const line of linesWithMeta) {
    if (ep) {
      switch (line.meta.type) {
        case 'empty': {
          merge(ep);
          ep = null;
          break;
        }
        case 'episode-title': {
          // include line
          //   "  [a]" <= "    [b]"
          // end current episode and start new
          //   "  [a]" == "  [b]"
          //   "  [a]" >= "[b]"
          if (parentIndentLevel < line.meta.indent) {
            ep.lines.push(line);
          } else {
            merge(ep);
            parentIndentLevel = line.meta.indent;
            ep = {
              // refined by case condition
              for: (line.meta as EpisodeTitleLineMetadata).name,
              context: getBaseContext(),
              lines: [],
            };
          }
          break;
        }
        default: {
          // include
          //   "  [a]" <= "    b"
          // not include, end episode
          //   "  [a]" == "  b"
          //   "  [a]" >= "b"
          if (parentIndentLevel < line.meta.indent) {
            ep.lines.push(line);
          } else {
            merge(ep);
            ep = null;
          }
        }
      }
    } else {
      // start construction of new child-episode
      if (line.meta.type === 'episode-title') {
        parentIndentLevel = line.meta.indent;
        ep = {
          for: line.meta.name,
          context: getBaseContext(),
          lines: [],
        };
      }
    }
  }

  // for lacking EOL
  if (ep) {
    merge(ep);
  }

  return Array.from(episodes.values());
};

export const makeEpisode = (block: EpisodeBlock): Episode => ({
  of: block.of,
  context: getContext(block.lines[0]),
  lines: block.lines,
  children: parseChildEpisodes(block),
});
