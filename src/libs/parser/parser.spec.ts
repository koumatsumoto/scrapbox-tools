import { parseLines } from './parser';
import { makeLines } from './test-helpers';

test('parseLines', () => {
  // title
  expect(parseLines(makeLines(['title']))[0].title).toBeTruthy();
  expect(parseLines(makeLines(['title', 'content']))[0].title).toBeTruthy();
  expect(parseLines(makeLines(['title', 'content']))[1].title).toBeUndefined();

  // code block
  {
    const lines = parseLines(makeLines(['title', 'code:index.js']));
    expect(lines[1].codeBlock).toEqual({
      filename: 'index.js',
      indent: 0,
      lang: '.js',
      end: true,
      start: true,
    });
  }
  {
    const lines = parseLines(makeLines(['title', 'code:index.js', 'not content']));
    expect(lines[1].codeBlock).toEqual({
      filename: 'index.js',
      indent: 0,
      lang: '.js',
      start: true,
      end: true,
    });
    expect(lines[2].codeBlock).toBeUndefined();
  }
  {
    const lines = parseLines(makeLines(['title', 'code:index.js', ' content']));
    expect(lines[1].codeBlock).toEqual({
      filename: 'index.js',
      indent: 0,
      lang: '.js',
      start: true,
      end: false,
    });
    expect(lines[2].codeBlock).toEqual({
      filename: 'index.js',
      indent: 0,
      lang: '.js',
      start: false,
      end: true,
    });
  }
  {
    const lines = parseLines(makeLines(['title', ' code:index.js', ' not content']));
    expect(lines[1].codeBlock).toEqual({
      filename: 'index.js',
      indent: 1,
      lang: '.js',
      start: true,
      end: true,
    });
    expect(lines[2].codeBlock).toBeUndefined();
  }

  // table block
  {
    const lines = parseLines(makeLines(['title', 'table:title']));
    expect(lines[1].tableBlock).toEqual({
      title: 'title',
      indent: 0,
      cells: [],
      start: true,
      end: true,
    });
  }
  {
    const lines = parseLines(makeLines(['title', 'table:title', 'not content']));
    expect(lines[1].tableBlock).toEqual({
      title: 'title',
      indent: 0,
      cells: [],
      start: true,
      end: true,
    });
    expect(lines[2].tableBlock).toBeUndefined();
  }
  {
    const lines = parseLines(makeLines(['title', 'table:title', ' content']));
    expect(lines[1].tableBlock).toEqual({
      title: 'title',
      indent: 0,
      cells: [],
      start: true,
      end: false,
    });
    expect(lines[2].tableBlock).toEqual({
      title: 'title',
      indent: 0,
      cells: [],
      start: false,
      end: true,
    });
  }
  {
    const lines = parseLines(makeLines(['title', ' table:title', ' not content']));
    expect(lines[1].tableBlock).toEqual({
      title: 'title',
      indent: 1,
      cells: [],
      start: true,
      end: true,
    });
    expect(lines[2].tableBlock).toBeUndefined();
  }
});
