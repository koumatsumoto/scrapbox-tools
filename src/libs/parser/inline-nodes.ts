export type InlineNode =
  | string
  | {
      type: 'quote';
      unit: {
        whole: string;
        content: string;
        tag: string;
      };
    }
  | {
      type: 'hashTag';
      unit: {
        content: string;
        whole: string;
        tag: '#';
        page: string;
      };
    }
  | {
      type: 'strong';
      unit: {
        whole: string;
        content: string;
      };
    }
  | {
      type: 'deco';
      unit: {
        whole: string;
        content: string;
        deco: string;
        strong: number;
        italic: boolean;
        strike: boolean;
        underline: boolean;
      };
    }
  | {
      type: 'deco-formula';
      unit: {
        whole: string;
        content: string;
        formula: string;
      };
    }
  | {
      type: 'icon';
      unit: {
        whole: string;
        content: string;
        project: string;
        page: string;
        size: number;
      };
    }
  | {
      type: 'code';
      unit: {
        whole: string;
        content: string;
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
      type: 'gyazo';
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

const inlineNodesRegexp = new RegExp(
  [
    '(?<quote>^(?<quoteTag>> )(?<quoteContent>\\S+))',
    '(?<tag>#(?<tagContent>\\S+))', // NOTE: #[tag] is not tag
    '(?<bold>\\[\\[(?<boldContent>.+)\\]\\])',
    '(?<deco>\\[(?<decoKeys>[*/_-]+?) (?<decoContent>.+?)\\])',
    '(?<decoFormula>\\[(?<decoFormulaContent>\\$ (?<formula>.+?))\\])',
    '(?<icon>\\[(\\/(?<iconProject>\\S+?)\\/)?(?<iconContent>(?<iconPage>\\S+)?\\.icon)\\])',
    '(?<code>`(?<codeContent>.*?)`)',
    '(?<gyazo>\\[(?<gyazoContent>https?://i\\.gyazo\\.com/\\S+)\\])',
    '(?<urlLinkB>\\[(?<urlLinkBContent>(?<!https?:)(?<urlLinkBTitle>\\S+)\\s+(?<urlLinkBLink>https?://\\S+))\\])',
    '(?<urlLinkA>\\[(?<urlLinkAContent>(?<urlLinkALink>https?://\\S+)(?:\\s+(?<urlLinkATitle>\\S+))?)\\])',
    '(?<link>\\[(?<linkContent>(?:/(?<linkProject>\\S|[^/]+)/)?(?<linkPage>\\S+?))\\])',
    '(?<url>https?://\\S+)',
    '(?<text>.+(?!(?:#\\S+)|(?:`.*?`)|(?:\\[.+?\\])))',
  ].join('|'),
  'gu',
);

type ParseResult = {
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
  url?: string;
  gyazo?: string;
  gyazoContent?: string;
  text?: string;
};

export const parseInlineNodes = (text: string): InlineNode | InlineNode[] => {
  if (text === '') {
    return '';
  }

  const nodes = [...text.matchAll(inlineNodesRegexp)]
    .map((match) => (match.groups ?? {}) as ParseResult)
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
              size: 1, // TODO(feat): not supported
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
        case typeof match.gyazo === 'string': {
          return {
            type: 'gyazo',
            unit: {
              whole: match.gyazo,
              content: match.gyazoContent,
            },
          };
        }
        case typeof match.url === 'string': {
          return {
            type: 'url',
            unit: {
              whole: match.url,
              content: match.url,
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
