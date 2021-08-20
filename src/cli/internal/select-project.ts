import * as inquirer from 'inquirer';
import { RestApiClient } from '../../scrapbox-client/rest-api-client/rest-api-client';

export const selectProject = async ({ client }: { client: RestApiClient }) => {
  const projectOptions = await client.getProjects().then(({ projects }) => projects.map(({ name }) => name));
  const answers = await inquirer.prompt<{ project: string }>([{ type: 'list', name: 'project', message: 'select target project', choices: projectOptions }]);

  return answers.project;
};
