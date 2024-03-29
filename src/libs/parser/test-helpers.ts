export const testData = [
  'title',
  '',
  'text',
  '[link]',
  '[link-with-url https://example.com]',
  '[https://i.gyazo.com/da78df293f9e83a74b5402411e2f2e01.png]',
  '[hr.icon]',
  '[[bold]]',
  '[* strong]',
  '[** more stronger]',
  '[/ italic]',
  '[/* strong and italic]',
  '[- strike]',
  '[$ formula]',
  '#tag',
  ' indent',
  ' indent with text',
  ' indent with [node]',
  '> quote text',
  '`code`',
  'code:index.js',
  '  code block',
  'table:table',
  ' 1A\t1B',
  ' 2A\t2B',
  '$ cli with $',
  '% cli with %',
  '',
].map((text, index) => ({
  id: `id ${index}`,
  text,
  userId: `userId ${index}`,
  created: 1631933021,
  updated: 1631933021,
}));

export const makeLines = (texts: string[]) => {
  return texts.map((text, index) => ({
    id: `id-${index}`,
    text,
    userId: `userId-${index}`,
    created: 1631933021,
    updated: 1631933021,
  }));
};
