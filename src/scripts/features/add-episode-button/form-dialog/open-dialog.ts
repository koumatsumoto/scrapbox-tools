import { TagOption } from '../config';
import { MyTagFormDialog } from './form-dialog.component';

let isDefined = false;
export const openDialog = (tagOptions: TagOption[]) => {
  if (!isDefined) {
    customElements.define(MyTagFormDialog.elementName, MyTagFormDialog);
    isDefined = true;
  }

  const dialog = new MyTagFormDialog(tagOptions);
  document.body.appendChild(dialog);
  dialog.open();

  return dialog;
};
