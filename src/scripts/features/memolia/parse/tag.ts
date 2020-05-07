import { TagLine, TextStartWithHash } from '../../../../libs/scrapbox/types';
import { Tag } from '../types';

// full-width space separator is allowed
export const splitToWords = (text: TagLine['text']): string[] => text.split(/\s/);
// e.g. '#word'
export const isValidTagText = (word: string): word is TextStartWithHash => /^#\S+$/.test(word);
// e.g. '#word' => 'word'
export const extractWord = (word: TextStartWithHash) => word.slice(1);

export const parseTag = (line: TagLine): Tag[] => {
  const words = splitToWords(line.text);
  const tags: Tag[] = [];
  for (const word of words) {
    // validation
    if (isValidTagText(word)) {
      tags.push({
        name: extractWord(word),
        raw: word,
      });
    }

    new Error(`"${word}" is invalid`);
  }

  return tags;
};
