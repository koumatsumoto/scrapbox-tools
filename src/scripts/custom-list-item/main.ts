import { defaultImage } from './default-image';
import { highlightTags } from './highlight-tags';
import { removeSettingsAndUserPages } from './remove-settings-and-user-pages';
import { showDatetime } from './show-datetime';

export const enableCustomListItem = async () => {
  defaultImage();
  highlightTags();
  removeSettingsAndUserPages();
  showDatetime();
};
