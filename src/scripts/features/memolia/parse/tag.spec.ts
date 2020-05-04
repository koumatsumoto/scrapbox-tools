import { extractWord, splitToWords, isValidTagText } from './tag';

describe('tag parser', () => {
  test('parseTags', () => {
    expect(splitToWords('#2020/04/17 #13:00　#S #A' as any)).toEqual(['#2020/04/17', '#13:00', '#S', '#A']);
  });

  test('validateTagText', () => {
    expect(isValidTagText('#w')).toBeTruthy();
    expect(isValidTagText('#日本語')).toBeTruthy();
    expect(isValidTagText('#word_with_underscore')).toBeTruthy();
    expect(isValidTagText('#word with space')).toBeFalsy();
    expect(isValidTagText('non-hash')).toBeFalsy();
  });

  test('extractWord', () => {
    expect(extractWord('#word' as any)).toBe('word');
  });
});
