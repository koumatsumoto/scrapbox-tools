import minimist from 'minimist';
import { deploy } from './commands/deploy';
import { isAllowedCommandType } from './internal/util';

type ParsedArgs = {
  _: [CommandType: string, ProjectAndPage: string, FilePath: string]; // e.g. $ scrapbox-tools deploy project/page userscript.js
};

const argv = minimist<ParsedArgs>(process.argv.slice(2));

const token = process.env.TOKEN ?? '';
const [commandType, projectAndPage, sourceFilePath] = argv._;

if (!isAllowedCommandType(commandType)) {
  throw new Error(`InvalidArgumentError: command ${commandType} is not supported`);
}

const [project, page] = projectAndPage.split('/');

// NOTE: 'deploy' is only supported
deploy({ token, project, page, sourceFilePath })
  .then(() => {
    console.log('completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('errored', error);
    process.exit(1);
  });
