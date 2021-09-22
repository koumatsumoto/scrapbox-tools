import { parseLine } from './line';

test('parseLine', () => {
  expect(parseLine('')).toEqual({
    indent: '',
    empty: true,
    nodes: '',
  });
  expect(parseLine(' ')).toEqual({
    indent: ' ',
    empty: true,
    nodes: {
      type: 'indent',
      unit: {
        content: '',
        tag: ' ',
        whole: ' ',
      },
      children: '',
    },
  });
  expect(parseLine(' text')).toEqual({
    indent: ' ',
    empty: false,
    nodes: {
      type: 'indent',
      children: 'text',
      unit: {
        content: 'text',
        tag: ' ',
        whole: ' text',
      },
    },
  });
  expect(parseLine('text')).toEqual({
    indent: '',
    empty: false,
    nodes: 'text',
  });

  expect(parseLine('code:index.js')).toEqual({
    indent: '',
    empty: false,
    codeBlock: {
      filename: 'index.js',
      indent: 0,
      lang: '.js',
      start: true,
      end: true,
    },
  });
  expect(parseLine(' code:index.js')).toEqual({
    indent: ' ',
    empty: false,
    codeBlock: {
      filename: 'index.js',
      indent: 1,
      lang: '.js',
      start: true,
      end: true,
    },
  });

  expect(parseLine('table:title')).toEqual({
    indent: '',
    empty: false,
    tableBlock: {
      indent: 0,
      title: 'title',
      cells: [],
      start: true,
      end: true,
    },
  });
  expect(parseLine(' table:title')).toEqual({
    indent: ' ',
    empty: false,
    tableBlock: {
      indent: 1,
      title: 'title',
      cells: [],
      start: true,
      end: true,
    },
  });

  expect(parseLine('$ command')).toEqual({
    indent: '',
    empty: false,
    cli: {
      command: 'command',
      prefix: '$',
    },
  });
  expect(parseLine(' % command')).toEqual({
    indent: ' ',
    empty: false,
    cli: {
      command: 'command',
      prefix: '%',
    },
  });
});
