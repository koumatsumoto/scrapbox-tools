import { getFirstLineOrFail, getPrivateApi, isEmptyPage, isTitleOnlyPage, loadPage } from '../../libs/scrapbox';
import { tagOptions } from './config';
import { createLineInsertions } from './internal/create-line-insertions';
import { openTagFormDialog } from './my-tag-form-dialog/open-tag-form-dialog';

export const openDialogAndWriteTags = async () => {
  try {
    const [api, result] = await Promise.all([getPrivateApi(), openTagFormDialog(tagOptions)]);

    if (result.ok) {
      // FIXME: scrapbox editor can not receive line changes if title-only page.
      const needReloadAfterUpdation = isEmptyPage() || isTitleOnlyPage();

      await api.changeLine(createLineInsertions(result.data));

      const titleLine = getFirstLineOrFail();
      const title = titleLine.text;

      if (needReloadAfterUpdation) {
        loadPage(title);
      }
    }
  } catch (e) {
    alert(e);
  }
};
