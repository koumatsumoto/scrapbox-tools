import { Command } from 'commander';
import * as path from 'path';
import { RestApiClient } from '../scrapbox-client/rest-api-client/rest-api-client';
import { deploy } from './internal/deploy';
import { selectProject } from './internal/select-project';
const pkg = require(path.resolve(__dirname, '../../package.json'));

const program = new Command().version(pkg.version);

program
  .command('deploy-userscript <js-file>')
  .description('update userscript in user page')
  .option('-p, --project <type>', 'project name')
  .action(async (jsFile: string, options: { project?: string }) => {
    const token = process.env.TOKEN ?? '';
    if (!token) {
      throw new Error('TOKEN not set');
    }
    const api = new RestApiClient(token);
    const selectedProject = options.project ?? (await selectProject({ client: api }));
    const userName = await api.getMe().then(({ name }) => name);

    await deploy({ token, project: selectedProject, page: userName, sourceFilePath: jsFile });
  });

program
  .command('deploy-usercss <css-file>')
  .description('update usercss in settings page')
  .option('-p, --project <type>', 'project name')
  .action(async (jsFile: string, options: { project?: string }) => {
    const token = process.env.TOKEN ?? '';
    if (!token) {
      throw new Error('TOKEN not set');
    }
    const api = new RestApiClient(token);
    const selectedProject = options.project ?? (await selectProject({ client: api }));

    await deploy({ token, project: selectedProject, page: 'settings', sourceFilePath: jsFile });
  });

program
  .parseAsync(process.argv)
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
