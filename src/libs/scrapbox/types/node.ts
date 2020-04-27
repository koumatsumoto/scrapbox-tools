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

export type DecoFormulaNode = {
  type: 'deco-formula';
  unit: DecoFormulaNodeUnit;
  // maybe same value of DecoFormulaNodeUnit.content
  children: DecoFormulaNodeUnit['content'];
};

export type GyazoNode = {
  type: 'gyazo';
  unit: {
    whole: string;
    content: string;
  };
  // maybe same value of GyazoNode.unit.content
  children: string;
};

export type IndentNode = {
  type: 'indent';
  unit: {
    // whole text started with indent chars
    whole: string;
    // indents, e.g. ' ', '\t', '\t\t'
    tag: string;
    // text trimmed tag
    content: string;
  };
  children: ScrapboxNode | ScrapboxNode[];
};

export type ScrapboxNode = SimpleTextNode | LinkNode | HashTagNode | DecoFormulaNode | IndentNode | GyazoNode;
