import { getApiManager, getFirstLineOrFail, isEmptyPage, isTitleOnlyPage, loadPage } from '../../../libs/scrapbox';
import { tagOptions } from './config';
import { openDialog } from './form-dialog/open-dialog';
import { makeInsertParams } from './make-insert-params/make-insert-params';

export const openDialogAndWriteTags = async () => {
  try {
    const dialog = openDialog(tagOptions);
    const [api, result] = await Promise.all([getApiManager(), dialog.result]);

    if (result.ok) {
      // FIXME: scrapbox editor can not receive line changes if title-only page.
      const needReloadAfterUpdation = isEmptyPage() || isTitleOnlyPage();

      dialog.showLoadingIndicator();
      await api.changeLineOfCurrentPage(makeInsertParams(result.data));

      const titleLine = getFirstLineOrFail();
      const title = titleLine.text;

      if (needReloadAfterUpdation) {
        loadPage(title);
      }
    }

    dialog.close();
  } catch (e) {
    alert(e);
  }
};
