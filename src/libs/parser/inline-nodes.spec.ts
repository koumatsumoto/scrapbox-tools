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

  expect(parseInlineNodes('[link]')).toEqual({
    type: 'link',
    unit: {
      content: 'link',
      page: 'link',
      whole: '[link]',
    },
  });

  expect(parseInlineNodes('text')).toEqual('text');
});
