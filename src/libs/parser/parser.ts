import { BlockNode, parseBlockNode } from './block-nodes';
import { threewiseMap } from './functions';

export type ParseResult = {
  text: string;
  section: { number: number; start: boolean; end: boolean };
  // sx custom fields
  indent: number;
  empty: boolean;
} & (
  | {
      title: true;
      nodes?: never;
      codeBlock?: never;
      tableBlock?: never;
      cli?: never;
    }
  | {
      title?: never;
      nodes: NonNullable<BlockNode['nodes']>;
      codeBlock?: never;
      tableBlock?: never;
      cli?: never;
    }
  | {
      title?: never;
      nodes?: never;
      codeBlock: NonNullable<BlockNode['codeBlock']> & { indent: number; start: boolean; end: boolean };
      tableBlock?: never;
      cli?: never;
    }
  | {
      title?: never;
      nodes?: never;
      codeBlock?: never;
      tableBlock: NonNullable<BlockNode['tableBlock']> & { indent: number; start: boolean; end: boolean };
      cli?: never;
    }
  | {
      title?: never;
      nodes?: never;
      codeBlock?: never;
      tableBlock?: never;
      cli: NonNullable<BlockNode['cli']>;
    }
);

export const parseLines = <T extends { text: string }>(lines: T[]): (ParseResult & T)[] => {
  return threewiseMap(
    lines.map((line) => ({ ...line, ...parseBlockNode(line.text) })),
    (curr, prev, next, index) => {
      const data = { ...curr } as Partial<ParseResult>;

      // add title
      if (index === 0) {
        data.title = true;
        data.nodes = undefined;
      }

      // add section
      data.section = {
        number: prev === undefined ? 0 : prev.section.end ? prev.section.number + 1 : prev.section.number,
        start: prev === undefined || prev.section.end,
        end: next === undefined || (curr.empty && !next.empty),
      };

      // add codeBlock
      if (curr.codeBlock) {
        data.codeBlock = {
          ...curr.codeBlock,
          indent: curr.indent,
          start: true,
          end: !next || !(curr.indent < next!.indent),
        };
      } else if (prev?.codeBlock && !prev.codeBlock.end && prev.codeBlock.indent < curr.indent) {
        data.codeBlock = {
          ...prev.codeBlock,
          start: false,
          end: !next || !(prev.codeBlock!.indent < next!.indent),
        };
        data.nodes = undefined;
      }

      // add tableBlock
      if (curr.tableBlock) {
        data.tableBlock = {
          ...curr.tableBlock,
          indent: curr.indent,
          start: true,
          end: !next || !(curr.indent < next!.indent),
        };
      } else if (prev?.tableBlock && !prev.tableBlock.end && prev.tableBlock.indent < curr.indent) {
        data.tableBlock = {
          ...prev.tableBlock,
          start: false,
          end: !next || !(prev.tableBlock.indent < next!.indent),
        };
        data.nodes = undefined;
      }

      return data as ParseResult;
    },
  );
};
