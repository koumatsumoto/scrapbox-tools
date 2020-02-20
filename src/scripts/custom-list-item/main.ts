import { defaultImage } from './default-image';
import { highlightTags } from './highlight-tags';
import { removeSettingsAndUserPages } from './remove-settings-and-user-pages';

export const enableCustomListItem = async () => {
  defaultImage();
  highlightTags();
  removeSettingsAndUserPages();
};
