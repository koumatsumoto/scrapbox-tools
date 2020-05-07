import { getDynamicConfig } from '../../..';

export const getConfigOrFail = async () => {
  const config = await getDynamicConfig();
  const tags = config.tags;
  if (tags === undefined) {
    throw new Error('[sx/memolia] tags for add-episode-button is not configured, set values into config page');
  }

  return tags;
};
