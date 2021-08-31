import { DecoFormulaNode, IndentNode, Node } from './node';

type GeneralLine = {
  id: string;
  text: string;
  userId?: string;
  created: number;
  updated: number;
  section: { number: number; start: boolean; end: boolean };
  nodes: Node | Node[];
};

export type TitleLine = GeneralLine & {
  title: true;
  nodes: undefined;
};

export type IndentedLine = GeneralLine & {
  nodes: IndentNode;
};

export type CodeBlockLine = GeneralLine & {
  codeBlock: {
    // e.g. 'js', 'json'
    lang: string;
    // e.g. "filename" if line text is "code:filename.js"
    filename: string;
    // default 1 (non-indented)
    indent: 1 | 2 | 3 | 4 | number;
    start: boolean;
    end: boolean;
  };
};

export type FormulaLine = GeneralLine & {
  formulaLine: true;
  // formula node is child of indent-node if line is indented
  nodes: DecoFormulaNode | IndentNode;
};

export type USLine = TitleLine | GeneralLine | IndentedLine | CodeBlockLine | FormulaLine;
