export const isAllowedCommandType = (value: string): value is 'deploy' => ['deploy'].includes(value);
export const isNonEmptyString = (value: unknown): value is string => typeof value === 'string' && value.length > 0;
export const isCSSFile = (value: string) => value.endsWith('.css');
export const isJSFile = (value: string) => value.endsWith('.js');
export const validateDeployArguments = ({ project, page, sourceFilePath, token }: { project: string; page: string; sourceFilePath: string; token: string }) => {
  const errors: string[] = [];

  if (!isNonEmptyString(project)) {
    errors.push('project is required');
  }
  if (!isNonEmptyString(page)) {
    errors.push('page is required');
  }
  if (!isNonEmptyString(sourceFilePath)) {
    errors.push('filepath is required');
  }
  if (!(isCSSFile(sourceFilePath) || isJSFile(sourceFilePath))) {
    errors.push('file type is not css or js');
  }
  if (!isNonEmptyString(token)) {
    errors.push('token is required');
  }

  return errors;
};
