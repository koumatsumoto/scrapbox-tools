import { groupBy } from 'fp-ts/es6/NonEmptyArray';
import { DynamicConfigTag } from '../../../config';

const groupByType = groupBy((tag: DynamicConfigTag) => tag.type);
const toRecordByType = (tags: DynamicConfigTag[]) => groupByType(tags);
export const makeCheckboxesHTML = (tags: DynamicConfigTag[]) => {
  let labelId = 0;

  let html = '';
  for (const [type, items] of Object.entries(toRecordByType(tags))) {
    html += `<div class="tag-group ${type}">`;
    for (const tag of items) {
      const id = `tag-${labelId++}`;
      html += `<input id="${id}" type="checkbox" name="tags" value="${tag.name}"><label for="${id}">${tag.name}</label>`;
    }
    html += `</div>`;
  }

  return html;
};
