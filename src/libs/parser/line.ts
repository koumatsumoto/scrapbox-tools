const indentRegexp = '^(?<indent>\\s*)';
const codeBlockRegexp = '(?<codeBlock>code:(?<codeBlockFileName>(?:[^.]+$)|(?:.*(?<codeBlockLang>\\.\\S+$(?!\\..+)))))';
const tableBlockRegexp = '(?<tableBlock>table:(?<tableBlockTitle>.+))';
const cliRegexp = '(?<cli>(?<cliPrefix>[$%]) (?<cliCommand>.+))';
const textRegexp = '(?<text>.*)';
const parseLineRegexp = new RegExp(`${indentRegexp}(${[codeBlockRegexp, tableBlockRegexp, cliRegexp, textRegexp].join('|')})`, 'gu');

type ParseLineTextResult = {
  indent?: string;
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
      indent: string;
      codeBlock: string;
      codeBlockFileName: string;
      codeBlockLang: string;
    }
  | {
      indent: string;
      tableBlock: string;
      tableBlockTitle: string;
    }
  | {
      indent: string;
      cli: string;
      cliPrefix: string;
      cliCommand: string;
    }
  | {
      indent: string;
      text: string;
    }
);

export const parseLineText = (text: string) => {
  return [...text.matchAll(parseLineRegexp)].map((match) => match.groups)[0] as ParseLineTextResult;
};
