import { parseInlineNodes } from './inline-nodes';

test('parseInlineNodes', () => {
  expect(parseInlineNodes('> quote')).toEqual({
    type: 'quote',
    unit: {
      content: 'quote',
      tag: '> ',
      whole: '> quote',
    },
  });

  expect(parseInlineNodes('#tag')).toEqual({
    type: 'hashTag',
    unit: {
      content: 'tag',
      page: 'tag',
      tag: '#',
      whole: '#tag',
    },
  });
  expect(parseInlineNodes('##tag')).toEqual({
    type: 'hashTag',
    unit: {
      content: '#tag',
      page: '#tag',
      tag: '#',
      whole: '##tag',
    },
  });

  expect(parseInlineNodes('[* strong][**  more stronger][/ italic][*/ strong and italic][- strike][_ underline]')).toEqual([
    {
      type: 'deco',
      unit: {
        content: 'strong',
        deco: '*',
        italic: false,
        strike: false,
        strong: 1,
        underline: false,
        whole: '[* strong]',
      },
    },
    {
      type: 'deco',
      unit: {
        content: ' more stronger',
        deco: '**',
        italic: false,
        strike: false,
        strong: 2,
        underline: false,
        whole: '[**  more stronger]',
      },
    },
    {
      type: 'deco',
      unit: {
        content: 'italic',
        deco: '/',
        italic: true,
        strike: false,
        strong: 0,
        underline: false,
        whole: '[/ italic]',
      },
    },
    {
      type: 'deco',
      unit: {
        content: 'strong and italic',
        deco: '*/',
        italic: true,
        strike: false,
        strong: 1,
        underline: false,
        whole: '[*/ strong and italic]',
      },
    },
    {
      type: 'deco',
      unit: {
        content: 'strike',
        deco: '-',
        italic: false,
        strike: true,
        strong: 0,
        underline: false,
        whole: '[- strike]',
      },
    },
    {
      type: 'deco',
      unit: {
        content: 'underline',
        deco: '_',
        italic: false,
        strike: false,
        strong: 0,
        underline: true,
        whole: '[_ underline]',
      },
    },
  ]);

  expect(parseInlineNodes('[$ formula]')).toEqual({
    type: 'deco-formula',
    unit: {
      content: '$ formula',
      formula: 'formula',
      whole: '[$ formula]',
    },
  });

  expect(parseInlineNodes('[[bold]]')).toEqual({
    type: 'strong',
    unit: {
      content: 'bold',
      whole: '[[bold]]',
    },
  });

  expect(parseInlineNodes('[/icons/hr.icon]')).toEqual({
    type: 'icon',
    unit: {
      content: 'hr.icon',
      page: 'hr',
      project: 'icons',
      size: 1,
      whole: '[/icons/hr.icon]',
    },
  });
  expect(parseInlineNodes('[user.icon]')).toEqual({
    type: 'icon',
    unit: {
      content: 'user.icon',
      page: 'user',
      size: 1,
      whole: '[user.icon]',
    },
  });

  expect(parseInlineNodes('`code`')).toEqual({
    type: 'code',
    unit: {
      content: 'code',
      whole: '`code`',
    },
  });
  expect(parseInlineNodes('``')).toEqual({
    type: 'code',
    unit: {
      content: '',
      whole: '``',
    },
  });

  expect(parseInlineNodes('[https://i.gyazo.com/image.png]')).toEqual({
    type: 'gyazo',
    unit: {
      whole: '[https://i.gyazo.com/image.png]',
      content: 'https://i.gyazo.com/image.png',
    },
  });

  expect(parseInlineNodes('[link]')).toEqual({
    type: 'link',
    unit: {
      whole: '[link]',
      content: 'link',
      page: 'link',
    },
  });
  expect(parseInlineNodes('[/project/page]')).toEqual({
    type: 'link',
    unit: {
      whole: '[/project/page]',
      content: '/project/page',
      page: 'page',
      project: 'project',
    },
  });
  expect(parseInlineNodes('[/a/b/c/]')).toEqual({
    type: 'link',
    unit: {
      whole: '[/a/b/c/]',
      content: '/a/b/c/',
      page: 'b/c/',
      project: 'a',
    },
  });

  expect(parseInlineNodes('[https://pass]')).toEqual({
    type: 'urlLink',
    unit: {
      whole: '[https://pass]',
      content: 'https://pass',
      link: 'https://pass',
    },
  });
  expect(parseInlineNodes('[https://pass title]')).toEqual({
    type: 'urlLink',
    unit: {
      whole: '[https://pass title]',
      content: 'https://pass title',
      link: 'https://pass',
      title: 'title',
    },
  });
  expect(parseInlineNodes('[title https://pass]')).toEqual({
    type: 'urlLink',
    unit: {
      content: 'title https://pass',
      link: 'https://pass',
      title: 'title',
      whole: '[title https://pass]',
    },
  });

  expect(parseInlineNodes('http://pass')).toEqual({
    type: 'url',
    unit: {
      content: 'http://pass',
      whole: 'http://pass',
    },
  });
  expect(parseInlineNodes('https://pass')).toEqual({
    type: 'url',
    unit: {
      content: 'https://pass',
      whole: 'https://pass',
    },
  });

  expect(parseInlineNodes('text')).toEqual('text');
  expect(parseInlineNodes('text with https://pass link')).toEqual([
    'text with ',
    {
      type: 'url',
      unit: {
        content: 'https://pass',
        whole: 'https://pass',
      },
    },
    ' link',
  ]);
  expect(parseInlineNodes('text [link], #tag, `code` and more')).toEqual([
    'text ',
    {
      type: 'link',
      unit: {
        content: 'link',
        page: 'link',
        whole: '[link]',
      },
    },
    ', ',
    {
      type: 'hashTag',
      unit: {
        content: 'tag,',
        page: 'tag,',
        tag: '#',
        whole: '#tag,',
      },
    },
    ' ',
    {
      type: 'code',
      unit: {
        content: 'code',
        whole: '`code`',
      },
    },
    ' and more',
  ]);
});
