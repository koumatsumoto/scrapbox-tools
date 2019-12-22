/**
 * Common variables and functions (Scrapbox loads each scripts into global environment)
 */
import { applyNonIndentedTextClass } from './scripts/apply-non-indented-text-class';
import { applyTimeTextClass } from './scripts/apply-time-text-class';
import { copyTagText } from './scripts/copy-tag-text';
import { trimHashAndAddClassToTagsInListItems } from './scripts/trim-hash-and-add-class-to-tags-in-list-items';

export const main = () => {
  applyTimeTextClass();
  applyNonIndentedTextClass();
  trimHashAndAddClassToTagsInListItems();
  copyTagText();
  console.log('[scripts] loaded');
};
