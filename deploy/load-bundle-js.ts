import * as fs from 'fs';

// relative where deploy command executed
const bundleJsFilePath = './dist/bundle.min.js';

export const loadBundleJs = () =>
  new Promise<string>((resolve, reject) =>
    fs.readFile(bundleJsFilePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    }),
  );
