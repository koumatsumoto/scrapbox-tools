/**
 * Common variables and functions (Scrapbox loads each scripts into global environment)
 */
import { applyNonIndentedTextClass } from './extensions/apply-non-indented-text-class';
import { applyTimeTextClass } from './extensions/apply-time-text-class';
import { copyTagText } from './extensions/copy-tag-text';
import { trimHashAndAddClassToTagsInListItems } from './extensions/trim-hash-and-add-class-to-tags-in-list-items';

export const main = () => {
  applyTimeTextClass();
  applyNonIndentedTextClass();
  trimHashAndAddClassToTagsInListItems();
  copyTagText();
  console.log('[extensions] loaded');
};
