import { SetupWindowScrapboxOption } from '../setup-window-scrapbox';

export const data: Record<string, SetupWindowScrapboxOption> = {
  sample1: {
    layout: 'page',
    pageLines: [
      {
        id: '5df2f8b7e27558000092e196',
        text: 'kou',
        userId: '5dc685a50fc39d0017e27558',
        created: 1,
        updated: 1,
        title: true,
        section: { number: 0, start: true, end: false },
      },
      {
        id: '5dfeec6ae2755800007177ea',
        text: '[https://gyazo.com/cb3fa739b567b9ff8762a405b438b65d]',
        created: 2,
        updated: 2,
        section: { number: 0, start: false, end: false },
        nodes: {
          type: 'gyazo',
          unit: {
            whole: '[https://gyazo.com/cb3fa739b567b9ff8762a405b438b65d]',
            content: 'https://gyazo.com/cb3fa739b567b9ff8762a405b438b65d',
          },
          children: 'https://gyazo.com/cb3fa739b567b9ff8762a405b438b65d',
        },
      },
      {
        id: '5dfeec6ae2755800007177eb',
        text: '',
        created: 3,
        updated: 3,
        section: { number: 0, start: false, end: true },
        nodes: '',
      },
      {
        id: '5dfeec6ae2755800007177ec',
        text: 'code:script.js',
        created: 4,
        updated: 4,
        section: { number: 1, start: true, end: false },
        codeBlock: { lang: 'js', filename: 'script.js', indent: 1, start: true, end: false },
      },
      {
        id: '5dfeec6ae2755800007177ed',
        text: '',
        created: 5,
        updated: 7,
        section: { number: 1, start: false, end: false },
        codeBlock: { lang: 'js', filename: 'script.js', indent: 1, start: false, end: true },
      },
      {
        id: '5dfeec6ae2755800007177ee',
        text: '',
        created: 6,
        updated: 6,
        section: { number: 1, start: false, end: true },
        nodes: '',
      },
    ],
  },
};
