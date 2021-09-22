import { threewise } from './functions';
import { InlineNode } from './inline-nodes';
import { parseLine } from './line';

interface Line {
  id: string;
  text: string;
  userId: string;
  created: number;
  updated: number;
  title?: true;
  section?: { number: number; start: boolean; end: boolean };
  nodes?:
    | (InlineNode | InlineNode[])
    | {
        type: 'indent';
        unit: {
          content: string;
          tag: string;
          whole: string;
        };
        children: InlineNode | InlineNode[];
      };
  codeBlock?: {
    filename: string;
    lang: string; // extension of filename
    indent: number;
    start: boolean;
    end: boolean;
  };
  tableBlock?: {
    title: string;
    cells: string[];
    indent: number;
    start: boolean;
    end: boolean;
  };
  cli?: {
    prefix: '$' | '%';
    command: string;
  };
}

export const parseLines = (lines: Line[]) => {
  const results = lines.map((line) => ({ ...line, ...parseLine(line.text) }));

  for (const [previous, value, next] of threewise(results)) {
    const isFirstLine = previous === null;
    const isLastLine = next === null;
    const isSectionStart = isFirstLine || previous.section!.end;
    const isSectionEnd = isLastLine || (value.empty && !next.empty);
    const isCodeBlockStart = value.codeBlock !== undefined;
    const isCodeBlockContent = previous?.codeBlock && !previous.codeBlock.end && previous.codeBlock.indent < value.indent.length;
    const isTableBlockStart = value.tableBlock !== undefined;
    const isTableBlockContent = previous?.tableBlock && !previous.tableBlock.end && previous.tableBlock.indent < value.indent.length;

    // add section
    value.section = {
      number: isFirstLine ? 0 : isSectionStart ? previous.section!.number + 1 : previous.section!.number,
      start: isSectionStart,
      end: isSectionEnd,
    };

    // add codeBlock
    if (isCodeBlockStart) {
      value.codeBlock = {
        ...value.codeBlock!,
        start: true,
        end: isLastLine || !(value.codeBlock!.indent < next!.indent.length),
      };
    } else if (isCodeBlockContent) {
      value.codeBlock = {
        ...previous.codeBlock!,
        start: false,
        end: isLastLine || !(previous.codeBlock!.indent < next!.indent.length),
      };
      value.nodes = undefined;
    }

    // add tableBlock
    if (isTableBlockStart) {
      value.tableBlock = {
        ...value.tableBlock!,
        start: true,
        end: isLastLine || !(value.tableBlock!.indent < next!.indent.length),
      };
    } else if (isTableBlockContent) {
      value.tableBlock = {
        ...previous.tableBlock!,
        start: false,
        end: isLastLine || !(previous.tableBlock!.indent < next!.indent.length),
      };
      value.nodes = undefined;
    }

    // update title line
    if (isFirstLine) {
      value.title = true;
      value.nodes = undefined;
    }
  }

  return results;
};
