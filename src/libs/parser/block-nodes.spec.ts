import { parseBlockNode } from './block-nodes';

test('parseBlockNode', () => {
  expect(parseBlockNode('')).toEqual({
    empty: true,
    indent: 0,
    nodes: '',
  });
  expect(parseBlockNode('text')).toEqual({
    empty: false,
    indent: 0,
    nodes: 'text',
  });
  expect(parseBlockNode(' ')).toEqual({
    empty: true,
    indent: 1,
    nodes: {
      children: '',
      type: 'indent',
      unit: { content: '', tag: ' ', whole: ' ' },
    },
  });
  expect(parseBlockNode(' text')).toEqual({
    empty: false,
    indent: 1,
    nodes: {
      children: 'text',
      type: 'indent',
      unit: { content: 'text', tag: ' ', whole: ' text' },
    },
  });
  expect(parseBlockNode('code:index.js')).toEqual({
    empty: false,
    indent: 0,
    codeBlock: {
      filename: 'index.js',
      lang: '.js',
    },
  });
  expect(parseBlockNode(' code:index.js')).toEqual({
    empty: false,
    indent: 1,
    codeBlock: {
      filename: 'index.js',
      lang: '.js',
    },
  });
  expect(parseBlockNode(' code:index')).toEqual({
    empty: false,
    indent: 1,
    codeBlock: {
      filename: 'index',
      lang: '',
    },
  });
  expect(parseBlockNode('table:title')).toEqual({
    empty: false,
    indent: 0,
    tableBlock: {
      cells: [],
      title: 'title',
    },
  });
  expect(parseBlockNode(' table:title')).toEqual({
    empty: false,
    indent: 1,
    tableBlock: {
      cells: [],
      title: 'title',
    },
  });
  expect(parseBlockNode('$ command')).toEqual({
    empty: false,
    indent: 0,
    cli: {
      command: 'command',
      prefix: '$',
    },
  });
  expect(parseBlockNode(' % command')).toEqual({
    empty: false,
    indent: 1,
    cli: {
      command: 'command',
      prefix: '%',
    },
  });
});
