// space, full-width space, tab
const spaceRegexp = /[\u{20}\u{3000}\t]/gu;

export const splitWords = (text: string) =>
  text
    .split(spaceRegexp)
    .map((str) => str.trim())
    .filter((wordOrEmpty) => !!wordOrEmpty);

export const joinWords = (words: string[]) => words.join(' ');

export const addWord = (word: string, element: { value: string }) => {
  const words = splitWords(element.value);
  if (!words.includes(word)) {
    words.push(word);
  }

  element.value = joinWords(words);
};

export const removeWord = (word: string, element: { value: string }) => {
  const existing = splitWords(element.value);
  const result: string[] = [];

  for (const e of existing) {
    if (e !== word) {
      result.push(e);
    }
  }

  element.value = joinWords(result);
};
