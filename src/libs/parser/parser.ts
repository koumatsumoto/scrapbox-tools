import { isString, threewise } from './functions';
import { InlineNode, parseInlineText } from './inline-nodes';
import { parseLineText } from './line';

interface LineInput {
  id: string;
  text: string;
  userId: string;
  created: number;
  updated: number;
  title?: boolean;
}

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
  // sx custom fields
  indent: number;
  empty: boolean;
}

export const parseLines = (lines: LineInput[]): Line[] => {
  const results = lines.map((line) => {
    const result = parseLineText(line.text);

    return {
      ...line,
      indent: result.indent.length,
      empty: isString(result.text) && result.text.length === 0, // e.g. '', ' ', '  ', ...
      section: {},
      codeBlock: isString(result.codeBlock)
        ? {
            filename: result.codeBlockFileName!,
            indent: result.indent.length,
            lang: result.codeBlockLang!,
          }
        : undefined,
      tableBlock: isString(result.tableBlock)
        ? {
            title: result.tableBlockTitle,
            indent: result.indent.length,
            cells: [],
          }
        : undefined,
      cli: isString(result.cli)
        ? {
            prefix: result.cliPrefix,
            command: result.cliCommand,
          }
        : undefined,
      nodes: isString(result.text)
        ? result.indent.length === 0
          ? parseInlineText(result.text!)
          : {
              type: 'indent',
              unit: {
                content: result.text,
                tag: result.indent,
                whole: line.text,
              },
              children: parseInlineText(result.text!),
            }
        : undefined,
    };
  });

  for (const [previous, value, next] of threewise<typeof results[number], Line>(results)) {
    const isFirstLine = previous === null;
    const isLastLine = next === null;
    const isSectionStart = isFirstLine || previous.section!.end;
    const isSectionEnd = isLastLine || (value.empty && !next.empty);
    const isCodeBlockStart = value.codeBlock !== undefined;
    const isCodeBlockContent = previous?.codeBlock && !previous.codeBlock.end && previous.codeBlock.indent < value.indent;
    const isTableBlockStart = value.tableBlock !== undefined;
    const isTableBlockContent = previous?.tableBlock && !previous.tableBlock.end && previous.tableBlock.indent < value.indent;

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
        end: isLastLine || !(value.codeBlock!.indent < next!.indent),
      };
    } else if (isCodeBlockContent) {
      value.codeBlock = {
        ...previous.codeBlock!,
        start: false,
        end: isLastLine || !(previous.codeBlock!.indent < next!.indent),
      };
      value.nodes = undefined;
    }

    // add tableBlock
    if (isTableBlockStart) {
      value.tableBlock = {
        ...value.tableBlock!,
        start: true,
        end: isLastLine || !(value.tableBlock!.indent < next!.indent),
      };
    } else if (isTableBlockContent) {
      value.tableBlock = {
        ...previous.tableBlock!,
        start: false,
        end: isLastLine || !(previous.tableBlock!.indent < next!.indent),
      };
      value.nodes = undefined;
    }

    // update title line
    if (isFirstLine) {
      value.title = true;
      value.nodes = undefined;
    }
  }

  return results as Line[];
};
