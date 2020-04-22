import { Brand } from '../../../libs/common';
import { ScrapboxLine, TextStartWithHash } from '../../../libs/scrapbox/types';

// can integrate its information into Φ (ii)
export type Phiable<A> = A & {
  // TODO: not implemented yet
  Φ?: (
    data: A,
  ) => {
    value: number;
    rank: number;
  };
};

// ideation name that is bracketed in text of line e.g. [Page Name]
export type Name = Brand<string, 'Name'>;

// ii: differentiate by type
export type Tag = Phiable<{
  name: string;
  raw: TextStartWithHash;
  type: 'date' | 'time' | 'feeling' | 'activity' | 'ideation' | 'unknown';
}>;

// TODO: arrange type
// ii: integrate tags
export type Context = Phiable<{
  tags: Tag[];
}>;

// made from Scrapbox.Page.lines
// ii:
// - length of text
// - count of bracketed words in text
export type Line = Phiable<{
  id: string;
  text: string;
  nodes: ScrapboxLine['nodes'];
}>;

// TODO: arrange type
// data passes to next episode;
export type Information = Phiable<{
  // parent context + ideation name at current position
  context: Context;
  // can 0
  lines: Line[];
}>;

export type EpisodeId = [Episode['context'], Episode['of']];

// TODO: arrange type
export type Link = {
  // parent episode
  from: EpisodeId;
  // destination
  to: EpisodeId;
  information: Information;
};

export type ChildEpisode = Phiable<{
  for: string;
  context: string[];
  lines: Line[];
}>;

// Episodic-Memory
export type Episode = Phiable<{
  // where episode belongs to
  of: Memory['name'];
  // have an array of tag
  context: string[];
  // all lines in episode block
  lines: Line[];
  // all references to linked to episode
  children: ChildEpisode[];
}>;

// Semantic-Memory constructed by Episodic-Memories
export type Semanteme = Phiable<{
  lines: Line[];
}>;

// construct from scrapbox.Page
// the node of episodes
export type Memory = Phiable<{
  name: Name;
  semanteme: Semanteme;
  episodes: Episode[];
}>;
