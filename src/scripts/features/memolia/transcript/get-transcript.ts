import { tail } from '../../../../libs/common/array';
import { Line, Memory } from '../types';

export type Transcript = {
  context: string[];
  contents: Line[];
};

export const getTranscript = (lineId: string, memory: Memory): Transcript => {
  for (const ep of memory.episodes) {
    for (const cep of ep.children) {
      // child-episode
      if (cep.lines[0].id === lineId) {
        return {
          context: cep.context,
          contents: tail(cep.lines),
        };
      }
      // internal in child-episode
      for (let i = 1; i < cep.lines.length; i++) {
        if (cep.lines[i].id === lineId) {
          return {
            context: [...cep.context, cep.for],
            contents: [],
          };
        }
      }
    }

    // episode
    for (const line of ep.lines) {
      if (line.id === lineId) {
        return {
          context: ep.context,
          contents: [],
        };
      }
    }
  }

  throw new Error('No line found');
};
