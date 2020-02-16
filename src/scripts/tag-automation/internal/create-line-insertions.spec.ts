import { getFakeJSTDate } from '../../../libs/common/test-helpers';
import { createLineInsertions } from './create-line-insertions';

describe('createLineInsertions', () => {
  const words = ['tag1', 'tag2'];
  const date = getFakeJSTDate(1581218918036); // 2020-02-09T03:28:38.036Z
  const emptyPage = [{ text: '' }] as any;
  const dailyTitleOnly = [{ text: '2020/02/08' }] as any;
  const dailyTitleEOF = [{ text: '2020/02/08' }, { text: '' }] as any;
  const symbolTitleOnly = [{ text: 'Symbol' }] as any;
  const symbolTitleEOF = [{ text: 'Symbol' }, { text: '' }] as any;
  const hasPreviousTags = [{ text: 'Symbol' }, { text: '#tag' }] as any;
  const has3Lines = [{ text: 'Symbol' }, { text: '#tag' }, { text: 'text' }] as any;
  const has3LinesEOF = [{ text: 'Symbol' }, { text: '#tag' }, { text: '' }] as any;

  it('should work', () => {
    expect(createLineInsertions(words, date, emptyPage)).toEqual([
      { text: '2020/02/16', type: 'update' },
      { title: '2020/02/16', type: 'title' },
      { text: '#12:00 #tag1 #tag2', type: 'insert' },
      { text: '', type: 'insert' },
      { text: 'tagLineText', type: 'description' },
    ]);
    expect(createLineInsertions(words, date, dailyTitleOnly)).toEqual([
      { type: 'insert', text: '#12:00 #tag1 #tag2' },
      { type: 'insert', text: '' },
      { type: 'description', text: 'tagLineText' },
    ]);
    expect(createLineInsertions(words, date, dailyTitleEOF)).toEqual([
      { type: 'insert', text: '#12:00 #tag1 #tag2' },
      { type: 'insert', text: '' },
    ]);
    expect(createLineInsertions(words, date, symbolTitleOnly)).toEqual([
      { type: 'insert', text: '#2020/02/09 #tag1 #tag2' },
      { type: 'insert', text: '' },
      { type: 'description', text: 'tagLineText' },
    ]);
    expect(createLineInsertions(words, date, symbolTitleEOF)).toEqual([
      { type: 'insert', text: '#2020/02/09 #tag1 #tag2' },
      { type: 'insert', text: '' },
    ]);
    expect(createLineInsertions(words, date, hasPreviousTags)).toEqual([
      { type: 'insert', text: '' },
      { type: 'insert', text: '#2020/02/09 #tag1 #tag2' },
      { type: 'insert', text: '' },
    ]);
    expect(createLineInsertions(words, date, has3Lines)).toEqual([
      { type: 'insert', text: '' },
      { type: 'insert', text: '#2020/02/09 #tag1 #tag2' },
      { type: 'insert', text: '' },
    ]);
    expect(createLineInsertions(words, date, has3LinesEOF)).toEqual([
      { type: 'insert', text: '#2020/02/09 #tag1 #tag2' },
      { type: 'insert', text: '' },
    ]);
  });
});
