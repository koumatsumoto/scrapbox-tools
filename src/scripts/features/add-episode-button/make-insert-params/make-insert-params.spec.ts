import { getFakeJSTDate } from '../../../../libs/common/test-helpers';
import { makeInsertParams } from './make-insert-params';

describe('makeInsertParams', () => {
  const words = ['tag1', 'tag2'];
  const date = getFakeJSTDate('2020-02-09T03:28:38.036Z');
  const emptyPage = [{ text: '', id: 'id' }] as any;
  const dailyTitleOnly = [{ text: '2020/02/08', id: 'id' }] as any;
  const dailyTitleEOF = [{ text: '2020/02/08' }, { text: '' }] as any;
  const symbolTitleOnly = [{ text: 'Symbol', id: 'id' }] as any;
  const symbolTitleEOF = [{ text: 'Symbol' }, { text: '' }] as any;
  const hasPreviousTags = [{ text: 'Symbol' }, { text: '#tag' }] as any;
  const has3Lines = [{ text: 'Symbol' }, { text: '#tag' }, { text: 'text' }] as any;
  const has3LinesEOF = [{ text: 'Symbol' }, { text: '#tag' }, { text: '' }] as any;

  it('should work', () => {
    expect(makeInsertParams(words, date, emptyPage)).toEqual([
      { type: 'title', title: '2020/02/09' },
      { type: 'insert', text: '#12:00 #tag1 #tag2' },
      { type: 'insert', text: '' },
      { type: 'description', text: '#12:00 #tag1 #tag2' },
    ]);
    expect(makeInsertParams(words, date, dailyTitleOnly)).toEqual([
      { type: 'title', title: '2020/02/08' },
      { type: 'insert', text: '#12:00 #tag1 #tag2' },
      { type: 'insert', text: '' },
      { type: 'description', text: '#12:00 #tag1 #tag2' },
    ]);
    expect(makeInsertParams(words, date, dailyTitleEOF)).toEqual([
      { type: 'insert', text: '#12:00 #tag1 #tag2' },
      { type: 'insert', text: '' },
    ]);
    expect(makeInsertParams(words, date, symbolTitleOnly)).toEqual([
      { type: 'title', title: 'Symbol' },
      { type: 'insert', text: '#2020/02/09 #12:00 #tag1 #tag2' },
      { type: 'insert', text: '' },
      { type: 'description', text: '#2020/02/09 #12:00 #tag1 #tag2' },
    ]);
    expect(makeInsertParams(words, date, symbolTitleEOF)).toEqual([
      { type: 'insert', text: '#2020/02/09 #12:00 #tag1 #tag2' },
      { type: 'insert', text: '' },
    ]);
    expect(makeInsertParams(words, date, hasPreviousTags)).toEqual([
      { type: 'insert', text: '' },
      { type: 'insert', text: '#2020/02/09 #12:00 #tag1 #tag2' },
      { type: 'insert', text: '' },
    ]);
    expect(makeInsertParams(words, date, has3Lines)).toEqual([
      { type: 'insert', text: '' },
      { type: 'insert', text: '#2020/02/09 #12:00 #tag1 #tag2' },
      { type: 'insert', text: '' },
    ]);
    expect(makeInsertParams(words, date, has3LinesEOF)).toEqual([
      { type: 'insert', text: '#2020/02/09 #12:00 #tag1 #tag2' },
      { type: 'insert', text: '' },
    ]);
  });
});
