import { isString } from './functions';
import { InlineNode, parseInlineNodes } from './inline-nodes';

export type BlockNode =
  | {
      indent: number;
      empty: boolean;
      codeBlock: { filename: string; lang: string }; // lang is extension of file
      tableBlock?: never;
      cli?: never;
      nodes?: never;
    }
  | {
      indent: number;
      empty: boolean;
      codeBlock?: never;
      tableBlock: { title: string; cells: string[] };
      cli?: never;
      nodes?: never;
    }
  | {
      indent: number;
      empty: boolean;
      codeBlock?: never;
      tableBlock?: never;
      cli: { prefix: '$' | '%'; command: string };
      nodes?: never;
    }
  | {
      indent: number;
      empty: boolean;
      codeBlock?: never;
      tableBlock?: never;
      cli?: never;
      nodes:
        | (InlineNode | InlineNode[])
        | {
            type: 'indent';
            unit: { whole: string; content: string; tag: string };
            children: InlineNode | InlineNode[];
          };
    };

const indentRegexp = '^(?<indent>\\s*)';
const codeBlockRegexp = '(?<codeBlock>code:(?<codeBlockFileName>(?:[^.]+$)|(?:.*(?<codeBlockLang>\\.\\S+$(?!\\..+)))))';
const tableBlockRegexp = '(?<tableBlock>table:(?<tableBlockTitle>.+))';
const cliRegexp = '(?<cli>(?<cliPrefix>[$%]) (?<cliCommand>.+))';
const textRegexp = '(?<text>.*)';
const parseLineRegexp = new RegExp(`${indentRegexp}(${[codeBlockRegexp, tableBlockRegexp, cliRegexp, textRegexp].join('|')})`, 'gu');

type ParseResult = {
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
};

export const parseBlockNode = (text: string): BlockNode => {
  const result = [...text.matchAll(parseLineRegexp)].map((match) => match.groups)[0] as ParseResult;
  const indent = result.indent.length;
  const empty = /^\s*$/.test(text); // i.e. '', ' ', '  ', ...

  switch (true) {
    case isString(result.codeBlock): {
      return {
        indent,
        empty,
        codeBlock: {
          filename: result.codeBlockFileName!,
          lang: result.codeBlockLang ?? '',
        },
      };
    }
    case isString(result.tableBlock): {
      return {
        indent,
        empty,
        tableBlock: {
          title: result.tableBlockTitle!,
          cells: [],
        },
      };
    }
    case isString(result.cli): {
      return {
        indent,
        empty,
        cli: {
          prefix: result.cliPrefix as '$' | '%',
          command: result.cliCommand!,
        },
      };
    }
    case isString(result.text): {
      return {
        indent,
        empty,
        nodes:
          result.indent.length === 0
            ? parseInlineNodes(result.text!)
            : {
                type: 'indent',
                unit: {
                  content: result.text!,
                  tag: result.indent,
                  whole: text,
                },
                children: parseInlineNodes(result.text!),
              },
      };
    }
    default: {
      throw new Error('unreachable');
    }
  }
};
