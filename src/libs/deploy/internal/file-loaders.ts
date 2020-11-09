import * as fs from 'fs';

const loadFile = (path: string) =>
  new Promise<string>((resolve, reject) =>
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    }),
  );

const getJSTString = () => new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
const versionComment = `/* deployed at: ${getJSTString()} */`;

// first space is needed for scrapbox code block
export const loadSourceCode = async (file: string) => ` ${versionComment}${await loadFile(file)}`;
