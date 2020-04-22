import { Brand } from '../../common';
import { ID } from '../public-api';
import { ScrapboxNode } from './node';

export type TextStartWithHash = Brand<string, 'TextStartWithHash'>;

type LineBase = {
  id: ID;
  text: string;
  userId?: string;
  created: number;
  updated: number;
  section: {
    number: number;
    start: boolean;
    end: boolean;
  };
};

export type TitleLine = LineBase & {
  title: true;
  nodes: undefined;
};

export type NonTitleLine = LineBase & {
  nodes: ScrapboxNode | ScrapboxNode[];
  codeBlock?: { lang: 'js' | string; filename: 'script.js' | string; indent: 1 | number; start: boolean; end: boolean };
  formulaLine?: true;
};

// lines that start with "#tag" string
export type TagLine = NonTitleLine & { text: TextStartWithHash };

export type NonIndentedFormulaLine = NonTitleLine & { formulaLine: true };

export type ScrapboxLine = TitleLine | NonTitleLine | TagLine | NonIndentedFormulaLine;
