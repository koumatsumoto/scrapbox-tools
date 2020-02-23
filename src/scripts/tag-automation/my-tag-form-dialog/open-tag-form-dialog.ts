import { TagOption } from '../config';
import { MyTagFormDialog } from './my-tag-form-dialog.component';

let isDefined = false;
export const openTagFormDialog = (tagOptions: TagOption[]) => {
  if (!isDefined) {
    customElements.define(MyTagFormDialog.elementName, MyTagFormDialog);
    isDefined = true;
  }

  const dialog = new MyTagFormDialog(tagOptions);
  document.body.appendChild(dialog);

  return dialog.open();
};
