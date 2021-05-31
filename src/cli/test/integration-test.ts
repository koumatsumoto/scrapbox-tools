require('dotenv').config();
const token = process.env.TOKEN ?? '';

import * as path from 'path';
import { deploy } from '../commands/deploy';

deploy({
  page: 'scrapbox-tools-integration.spec',
  sourceFilePath: path.join(process.cwd(), 'src/cli/test/testfile.js'),
  project: 'km-study',
  token,
})
  .then(() => {
    console.log('deploy completed');
    process.exit(0);
  })
  .catch((e) => {
    console.error('deploy errored', e);
    process.exit(1);
  });
