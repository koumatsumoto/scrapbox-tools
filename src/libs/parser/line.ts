import { isString } from './functions';
import { parseInlineNodes } from './inline-nodes';

const indentRegexp = '^(?<indent>\\s*)';
const codeBlockRegexp = '(?<codeBlock>code:(?<codeBlockFileName>\\S+(?<codeBlockLang>\\.\\S+)))';
const tableBlockRegexp = '(?<tableBlock>table:(?<tableBlockTitle>.+))';
const cliRegexp = '(?<cli>(?<cliPrefix>[$%]) (?<cliCommand>.+))';
const textRegexp = '(?<text>.*)';
const parseLineRegexp = new RegExp(`${indentRegexp}(${[codeBlockRegexp, tableBlockRegexp, cliRegexp, textRegexp].join('|')})`, 'gu');

type ParseLineResult = {
  indent: string;
  codeBlock?: string;
  codeBlockFileName?: string;
  codeBlockLang?: string;
  tableBlock?: string;
  tableBlockTitle?: string;
  cli?: string;
  cliPrefix?: string;
  cliCommand?: string;
  text?: string;
} & (
  | {
      codeBlock: string;
      codeBlockFileName: string;
      codeBlockLang: string;
    }
  | {
      tableBlock: string;
      tableBlockTitle: string;
    }
  | {
      cli: string;
      cliPrefix: string;
      cliCommand: string;
    }
  | {
      text: string;
    }
);

export const parseLine = (text: string) => {
  const result = ([...text.matchAll(parseLineRegexp)].map((match) => match.groups)[0] ?? {}) as ParseLineResult;

  return {
    indent: result.indent,
    empty: isString(result.text) && result.text.length === 0, // e.g. '', ' ', '  ', ...
    codeBlock: isString(result.codeBlock)
      ? {
          filename: result.codeBlockFileName!,
          indent: result.indent.length,
          lang: result.codeBlockLang!,
          start: true,
          end: true,
        }
      : undefined,
    tableBlock: isString(result.tableBlock)
      ? {
          title: result.tableBlockTitle,
          indent: result.indent.length,
          cells: [],
          start: true,
          end: true,
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
        ? parseInlineNodes(result.text!)
        : {
            type: 'indent',
            unit: {
              content: result.text,
              tag: result.indent,
              whole: text,
            },
            children: parseInlineNodes(result.text!),
          }
      : undefined,
  };
};
