import * as fs from 'fs';

// relative where deploy command executed
const bundleJsFilePath = './dist/bundle.min.js';
const cssFilePath = './dist/style.min.css';
const browserScriptPath = './dist/run-in-puppeteer-page.min.js';

const loadFile = (path: string) =>
  new Promise<string>((resolve, reject) =>
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    }),
  );

// first space is needed for scrapbox code block
export const loadUserScript = async () => ` ${await loadFile(bundleJsFilePath)}`;
export const loadUserCSS = async () => ` ${await loadFile(cssFilePath)}`;
// script to be evaluated in browser
export const loadBrowserScript = () => loadFile(browserScriptPath);
