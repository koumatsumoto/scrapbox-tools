import { Transcript } from './get-transcript';

export const toText = (transcript: Transcript) => {
  const headline = transcript.context.map((word) => `#${word}`).join(' ');
  const contents = transcript.contents.map((line) => line.text).join('\n');

  return contents ? `${headline}\n${contents}\n` : `${headline}\n`;
};

export const toClipboard = async (transcript: Transcript) => {
  await navigator.clipboard.writeText(toText(transcript));
};
