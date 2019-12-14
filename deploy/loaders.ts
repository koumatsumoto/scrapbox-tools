import * as fs from 'fs';

// relative where deploy command executed
const bundleJsFilePath = './dist/bundle.min.js';
const cssFilePath = './dist/style.min.css';

const loadFile = (path: string) =>
  new Promise<string>((resolve, reject) =>
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    }),
  );

export const loadJS = () => loadFile(bundleJsFilePath);
export const loadCSS = () => loadFile(cssFilePath);
