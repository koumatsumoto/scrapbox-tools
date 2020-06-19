import * as fs from 'fs';
import { version } from '../../version';

const getJSTString = () => new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });

const loadFile = (path: string) =>
  new Promise<string>((resolve, reject) =>
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    }),
  );

const deployTime = getJSTString();
const versionString = `/* ${version.slice(0, 7)} ${deployTime} */`;

// first space is needed for scrapbox code block
export const loadSourceCode = async (file: string) => ` ${versionString}${await loadFile(file)}`;
