import { isString } from './functions';

export type InlineNode =
  | string
  | {
      type: 'quote';
      unit: {
        content: string;
        tag: string;
        whole: string;
      };
    }
  | {
      type: 'hashTag';
      unit: {
        content: string;
        page: string;
        tag: '#';
        whole: string;
      };
    }
  | {
      type: 'strong';
      unit: {
        content: string;
        whole: string;
      };
    }
  | {
      type: 'deco';
      unit: {
        content: string;
        deco: string;
        italic: boolean;
        strike: boolean;
        underline: boolean;
        strong: number;
        whole: string;
      };
    }
  | {
      type: 'deco-formula';
      unit: {
        content: string;
        formula: string;
        whole: string;
      };
    }
  | {
      type: 'icon';
      unit: {
        content: string;
        project: string;
        page: string;
        size: 1;
        whole: string;
      };
    }
  | {
      type: 'code';
      unit: {
        content: string;
        whole: string;
      };
    }
  | {
      type: 'link';
      unit: {
        content: string;
        page: string;
        whole: string;
      };
    };

const inlineNodesRegexp = new RegExp(
  [
    '(?<quote>^(?<quoteTag>> )(?<quoteContent>\\S+))',
    '(?<tag>#(?<tagContent>\\S+))', // NOTE: #[tag] is not tag
    '(?<bold>\\[\\[(?<boldContent>.+)\\]\\])',
    '(?<deco>\\[(?<decoKeys>[*/_-]+?) (?<decoContent>.+?)\\])',
    '(?<decoFormula>\\[(?<decoFormulaContent>\\$ (?<formula>.+?))\\])',
    '(?<icon>\\[(\\/(?<iconProject>\\S+?)\\/)?(?<iconContent>(?<iconPage>\\S+)?\\.icon)\\])',
    '(?<code>`(?<codeContent>.*?)`)',
    '(?<link>\\[(?<linkContent>.+?)\\])',
    '(?<char>.)',
  ].join('|'),
  'gu',
);

type ParseInlineNodesResult = {
  quote?: string;
  quoteTag?: string;
  quoteContent?: string;
  tag?: string;
  tagContent?: string;
  bold?: string;
  boldContent?: string;
  deco?: string;
  decoKeys?: string;
  decoContent?: string;
  decoFormula?: string;
  decoFormulaContent?: string;
  formula?: string;
  icon?: string;
  iconContent?: string;
  iconProject?: string;
  iconPage?: string;
  code?: string;
  codeContent?: string;
  link?: string;
  linkContent?: string;
  char?: string;
};

export const parseInlineText = (text: string): InlineNode | InlineNode[] => {
  if (text === '') {
    return '';
  }

  const nodes = [...text.matchAll(inlineNodesRegexp)]
    .map((match) => match.groups as ParseInlineNodesResult)
    .map((match) => {
      switch (true) {
        case typeof match.char === 'string': {
          return match.char;
        }
        case typeof match.quote === 'string': {
          return {
            type: 'quote',
            unit: {
              content: match.quoteContent,
              tag: match.quoteTag,
              whole: match.quote,
            },
          };
        }
        case typeof match.tag === 'string': {
          return {
            type: 'hashTag',
            unit: {
              content: match.tagContent,
              page: match.tagContent,
              tag: '#',
              whole: match.tag,
            },
          };
        }
        case typeof match.bold === 'string': {
          return {
            type: 'strong',
            unit: {
              content: match.boldContent,
              whole: match.bold,
            },
          };
        }
        case typeof match.deco === 'string': {
          return {
            type: 'deco',
            unit: {
              content: match.decoContent,
              deco: match.decoKeys,
              italic: match.decoKeys!.includes('/'),
              strike: match.decoKeys!.includes('-'),
              underline: match.decoKeys!.includes('_'),
              strong: [...match.decoKeys!].filter((char) => char === '*').length,
              whole: match.deco,
            },
          };
        }
        case typeof match.decoFormula === 'string': {
          return {
            type: 'deco-formula',
            unit: {
              content: match.decoFormulaContent,
              formula: match.formula,
              whole: match.decoFormula,
            },
          };
        }
        case typeof match.icon === 'string': {
          return {
            type: 'icon',
            unit: {
              content: match.iconContent,
              project: match.iconProject,
              page: match.iconPage,
              size: 1, // TODO(feat): currently not supported
              whole: match.icon,
            },
          };
        }
        case typeof match.code === 'string': {
          return {
            type: 'code',
            unit: {
              content: match.codeContent,
              whole: match.code,
            },
          };
        }
        case typeof match.link === 'string': {
          // TODO(feat): support urlLink
          return {
            type: 'link',
            unit: {
              content: match.linkContent,
              page: match.linkContent, // TODO(feat): support page
              whole: match.link,
            },
          };
        }
        default: {
          throw new Error('unreachable');
        }
      }
    })
    // concat chars to string
    .reduce((acc, node) => {
      const prev = acc.at(-1);

      if (isString(node) && isString(prev)) {
        acc.pop();
        acc.push(prev + node);
      } else {
        acc.push(node as any); // TODO(fix): correct type inference
      }

      return acc;
    }, [] as InlineNode[]);

  return nodes.length === 1 ? nodes[0] : nodes;
};
