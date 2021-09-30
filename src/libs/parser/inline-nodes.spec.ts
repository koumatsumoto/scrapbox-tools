import { parseInlineText } from './inline-nodes';

test('parseInlineText', () => {
  expect(parseInlineText('> quote')).toEqual({
    type: 'quote',
    unit: {
      content: 'quote',
      tag: '> ',
      whole: '> quote',
    },
  });

  expect(parseInlineText('#tag')).toEqual({
    type: 'hashTag',
    unit: {
      content: 'tag',
      page: 'tag',
      tag: '#',
      whole: '#tag',
    },
  });
  expect(parseInlineText('##tag')).toEqual({
    type: 'hashTag',
    unit: {
      content: '#tag',
      page: '#tag',
      tag: '#',
      whole: '##tag',
    },
  });

  expect(parseInlineText('[* strong][**  more stronger][/ italic][*/ strong and italic][- strike][_ underline]')).toEqual([
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

  expect(parseInlineText('[$ formula]')).toEqual({
    type: 'deco-formula',
    unit: {
      content: '$ formula',
      formula: 'formula',
      whole: '[$ formula]',
    },
  });

  expect(parseInlineText('[[bold]]')).toEqual({
    type: 'strong',
    unit: {
      content: 'bold',
      whole: '[[bold]]',
    },
  });

  expect(parseInlineText('[/icons/hr.icon]')).toEqual({
    type: 'icon',
    unit: {
      content: 'hr.icon',
      page: 'hr',
      project: 'icons',
      size: 1,
      whole: '[/icons/hr.icon]',
    },
  });
  expect(parseInlineText('[user.icon]')).toEqual({
    type: 'icon',
    unit: {
      content: 'user.icon',
      page: 'user',
      size: 1,
      whole: '[user.icon]',
    },
  });

  expect(parseInlineText('`code`')).toEqual({
    type: 'code',
    unit: {
      content: 'code',
      whole: '`code`',
    },
  });
  expect(parseInlineText('``')).toEqual({
    type: 'code',
    unit: {
      content: '',
      whole: '``',
    },
  });

  expect(parseInlineText('[link]')).toEqual({
    type: 'link',
    unit: {
      content: 'link',
      page: 'link',
      whole: '[link]',
    },
  });

  expect(parseInlineText('text')).toEqual('text');
});
