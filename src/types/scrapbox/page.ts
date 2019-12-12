export type LinkNodeUnit = {
  // page name to link
  page: string;
  // text trimmed '[]'
  content: string;
  // text including '[]'
  whole: string;
};

export type HashTagNodeUnit = {
  // page name to link
  page: string;
  tag: '#';
  // text trimmed '#'
  content: string;
  // text including '#'
  whole: string;
};

export type DecoFormulaNodeUnit = {
  // text including '[]'
  whole: string;
  // text trimmed '[]'
  content: string;
  // text trimmed formula, e.g. '$ '
  formula: string;
};

export type IndentNodeUnit = {
  // whole text started with indent chars
  whole: string;
  // indents, e.g. ' ', '\t', '\t\t'
  tag: string;
  // text trimmed tag
  content: string;
};

export type SimpleTextNode = string;

export type LinkNode = {
  type: 'link';
  unit: LinkNodeUnit;
  // maybe same value of LinkUnit.content
  children: LinkNodeUnit['content'];
};

export type HashTagNode = {
  type: 'hashTag';
  unit: HashTagNodeUnit;
  // maybe same value of LinkUnit.content
  children: HashTagNodeUnit['content'];
};

export type HashTagAndSimpleTextNodes = [SimpleTextNode, HashTagNode];

export type DecoFormulaNode = {
  type: 'deco-formula';
  unit: DecoFormulaNodeUnit;
  // maybe same value of DecoFormulaNodeUnit.content
  children: DecoFormulaNodeUnit['content'];
};

export type IndentNode = {
  type: 'indent';
  unit: IndentNodeUnit;
  children: ScrapboxNode | ScrapboxNode[];
};

export type ScrapboxNode = SimpleTextNode | LinkNode | HashTagNode | HashTagAndSimpleTextNodes | DecoFormulaNode | IndentNode;

export type TitleLine = {
  id: string;
  text: string;
  userId: string;
  created: number;
  updated: number;
  title: true;
  section: {
    number: number;
    start: boolean;
    end: boolean;
  };
};

export type NonTitleLine = {
  id: string;
  text: string;
  userId: string;
  created: number;
  updated: number;
  section: {
    number: number;
    start: boolean;
    end: boolean;
  };
  nodes: ScrapboxNode | ScrapboxNode[];
};

export type NonIndentedFormulaLine = NonTitleLine & { formulaLine: true };

export type ScrapboxPage = {
  title: TitleLine['text'];
  // first item is title line
  lines: (TitleLine | NonTitleLine | NonIndentedFormulaLine)[];
};
