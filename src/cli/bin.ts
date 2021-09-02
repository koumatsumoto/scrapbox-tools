import { Command } from 'commander';
import * as path from 'path';
import { RestApi } from '../libs';
import { deploy } from './internal/deploy';
import { selectProject } from './internal/select-project';
const pkg = require(path.resolve(__dirname, '../../package.json'));

const program = new Command().version(pkg.version);

program
  .command('deploy-userscript <js-file>')
  .description('update userscript in user page')
  .option('-p, --project <type>', 'project name')
  .option('-d, --debug', 'output extra debugging')
  .action(async (jsFile: string, options: { project?: string; debug: boolean }) => {
    const token = process.env.TOKEN ?? '';
    if (!token) {
      throw new Error('TOKEN not set');
    }
    const api = new RestApi(token);
    const selectedProject = options.project ?? (await selectProject({ client: api }));
    const userName = await api.getMe().then(({ name }) => name);

    await deploy({ token, project: selectedProject, page: userName, sourceFilePath: jsFile, debug: options.debug });
  });

program
  .command('deploy-usercss <css-file>')
  .description('update usercss in settings page')
  .option('-p, --project <type>', 'project name')
  .option('-d, --debug', 'output extra debugging')
  .action(async (jsFile: string, options: { project?: string; debug: boolean }) => {
    const token = process.env.TOKEN ?? '';
    if (!token) {
      throw new Error('TOKEN not set');
    }
    const api = new RestApi(token);
    const selectedProject = options.project ?? (await selectProject({ client: api }));

    await deploy({ token, project: selectedProject, page: 'settings', sourceFilePath: jsFile, debug: options.debug });
  });

program.parseAsync(process.argv).catch((e) => {
  console.error(e);
  process.exit(1);
});
