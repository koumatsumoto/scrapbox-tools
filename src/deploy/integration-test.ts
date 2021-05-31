require('dotenv').config();
const token = process.env.TOKEN;

import * as path from 'path';
import { Deployer } from './index';

export const config = {
  deployTargets: [
    {
      targetPageName: 'scrapbox-tools-integration.spec',
      codeBlockLabel: 'test.json',
      sourceFilePath: path.join(process.cwd(), 'src/deploy/integration-test-data.json'),
    },
  ],
};

const main = async () => {
  const deployer = new Deployer('km-study', token);
  const deployTasks = config.deployTargets.map((data) => deployer.deploy(data));

  await Promise.all(deployTasks);
};

main()
  .then(() => {
    console.log('deploy completed');
    process.exit(0);
  })
  .catch((e) => {
    console.error('deploy errored', e);
    process.exit(1);
  });
