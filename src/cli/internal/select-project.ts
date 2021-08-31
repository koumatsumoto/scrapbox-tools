import * as inquirer from 'inquirer';
import { RestApi } from '../../libs';

export const selectProject = async ({ client }: { client: RestApi }) => {
  const projectOptions = await client.getProjects().then(({ projects }) => projects.map(({ name }) => name));
  const answers = await inquirer.prompt<{ project: string }>([{ type: 'list', name: 'project', message: 'select target project', choices: projectOptions }]);

  return answers.project;
};
