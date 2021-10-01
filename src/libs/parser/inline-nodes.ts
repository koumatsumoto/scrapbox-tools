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
      type: 'url';
      unit: {
        whole: string;
        content: string;
      };
    }
  | {
      type: 'link';
      unit: {
        whole: string;
        content: string;
        page: string;
        project?: string;
      };
    }
  | {
      type: 'urlLink';
      unit: {
        whole: string;
        content: string;
        link: string;
        title?: string;
      };
    };

// TODO(feat): support url node
// TODO(feat): support urlLink node
const inlineNodesRegexp = new RegExp(
  [
    '(?<quote>^(?<quoteTag>> )(?<quoteContent>\\S+))',
    '(?<tag>#(?<tagContent>\\S+))', // NOTE: #[tag] is not tag
    '(?<bold>\\[\\[(?<boldContent>.+)\\]\\])',
    '(?<deco>\\[(?<decoKeys>[*/_-]+?) (?<decoContent>.+?)\\])',
    '(?<decoFormula>\\[(?<decoFormulaContent>\\$ (?<formula>.+?))\\])',
    '(?<icon>\\[(\\/(?<iconProject>\\S+?)\\/)?(?<iconContent>(?<iconPage>\\S+)?\\.icon)\\])',
    '(?<code>`(?<codeContent>.*?)`)',
    '(?<urlLinkB>\\[(?<urlLinkBContent>(?<!https?:)(?<urlLinkBTitle>\\S+)\\s+(?<urlLinkBLink>https?://\\S+))\\])',
    '(?<urlLinkA>\\[(?<urlLinkAContent>(?<urlLinkALink>https?://\\S+)(?:\\s+(?<urlLinkATitle>\\S+))?)\\])',
    '(?<link>\\[(?<linkContent>(?:/(?<linkProject>\\S|[^/]+)/)?(?<linkPage>\\S+?))\\])',
    '(?<text>.+(?!(?:#\\S+)|(?:`.*?`)|(?:\\[.+?\\])))',
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
  urlLinkA?: string;
  urlLinkAContent?: string;
  urlLinkALink?: string;
  urlLinkATitle?: string;
  urlLinkB?: string;
  urlLinkBContent?: string;
  urlLinkBLink?: string;
  urlLinkBTitle?: string;
  link?: string;
  linkContent?: string;
  linkProject?: string;
  linkPage?: string;
  text?: string;
};

export const parseInlineText = (text: string): InlineNode | InlineNode[] => {
  if (text === '') {
    return '';
  }

  const nodes = [...text.matchAll(inlineNodesRegexp)]
    .map((match) => (match.groups ?? {}) as ParseInlineNodesResult)
    .map((match) => {
      switch (true) {
        case typeof match.text === 'string': {
          return match.text;
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
          return {
            type: 'link',
            unit: {
              whole: match.link,
              content: match.linkContent,
              page: match.linkPage,
              project: match.linkProject,
            },
          };
        }
        case typeof match.urlLinkA === 'string': {
          return {
            type: 'urlLink',
            unit: {
              whole: match.urlLinkA,
              content: match.urlLinkAContent,
              link: match.urlLinkALink,
              title: match.urlLinkATitle,
            },
          };
        }
        case typeof match.urlLinkB === 'string': {
          return {
            type: 'urlLink',
            unit: {
              whole: match.urlLinkB,
              content: match.urlLinkBContent,
              link: match.urlLinkBLink,
              title: match.urlLinkBTitle,
            },
          };
        }
        default: {
          throw new Error('unreachable');
        }
      }
    }) as InlineNode[];

  return nodes.length === 1 ? nodes[0] : nodes;
};
