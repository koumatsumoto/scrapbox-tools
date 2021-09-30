import { parseLineText } from './line';

test('parseLineText', () => {
  expect(parseLineText('')).toEqual({
    indent: '',
    text: '',
  });
  expect(parseLineText(' ')).toEqual({
    indent: ' ',
    text: '',
  });
  expect(parseLineText(' text')).toEqual({
    indent: ' ',
    text: 'text',
  });
  expect(parseLineText('text')).toEqual({
    indent: '',
    text: 'text',
  });
  expect(parseLineText('code:index.js')).toEqual({
    codeBlock: 'code:index.js',
    codeBlockFileName: 'index.js',
    codeBlockLang: '.js',
    indent: '',
  });
  expect(parseLineText(' code:index.js')).toEqual({
    codeBlock: 'code:index.js',
    codeBlockFileName: 'index.js',
    codeBlockLang: '.js',
    indent: ' ',
  });
  expect(parseLineText(' code:index')).toEqual({
    codeBlock: 'code:index',
    codeBlockFileName: 'index',
    codeBlockLang: undefined,
    indent: ' ',
  });
  expect(parseLineText('table:title')).toEqual({
    indent: '',
    tableBlock: 'table:title',
    tableBlockTitle: 'title',
  });
  expect(parseLineText(' table:title')).toEqual({
    indent: ' ',
    tableBlock: 'table:title',
    tableBlockTitle: 'title',
  });
  expect(parseLineText('$ command')).toEqual({
    cli: '$ command',
    cliCommand: 'command',
    cliPrefix: '$',
    indent: '',
  });
  expect(parseLineText(' % command')).toEqual({
    cli: '% command',
    cliCommand: 'command',
    cliPrefix: '%',
    indent: ' ',
  });
});
