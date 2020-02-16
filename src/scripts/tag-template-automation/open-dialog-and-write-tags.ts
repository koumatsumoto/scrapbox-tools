import { getDateText, getPrivateApi, isEmptyPage, loadPage } from '../../libs/scrapbox';
import { tagOptions } from './config';
import { openDialog } from './dialog';
import { createLineInsertions } from './internal/create-line-insertions';

export const openDialogAndWriteTags = async () => {
  try {
    const [api, result] = await Promise.all([getPrivateApi(), openDialog({ tagOptions })]);

    if (result.ok) {
      // TODO: bad impl, real title is create in createLineInsertions(), this title is possible to mistake.
      const title = getDateText();
      const needReload = isEmptyPage();

      await api.changeLine(createLineInsertions(result.data));

      if (needReload) {
        loadPage(title);
      }
    }
  } catch (e) {
    alert(e);
  }
};
