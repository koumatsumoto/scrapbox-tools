const findIndex = (searchString: string, lines: { text: string }[]) => {
  return lines.findIndex((line) => line.text.includes(searchString));
};

export const findNextLineIdOrFail = (searchString: string, lines: { id: string; text: string }[]) => {
  const index = findIndex(searchString, lines);
  if (index === -1) {
    throw new Error('Line not found');
  }
  const nextLineOrNone = lines[index + 1];
  if (!nextLineOrNone) {
    throw new Error('Next line not found');
  }

  return nextLineOrNone.id;
};
