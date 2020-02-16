import { getDateText, getPrivateApi, getTimeText, isEmptyPage, loadPage, makeTag } from '../../libs/scrapbox';
import { tagOptions } from './config';
import { openDialog } from './dialog';
import { createLineInsertions } from './internal/create-line-insertions';

export const openDialogAndWriteTags = async () => {
  try {
    const [api, result] = await Promise.all([getPrivateApi(), openDialog({ tagOptions })]);

    if (result.ok) {
      if (isEmptyPage()) {
        const tagText = [getTimeText(), ...result.data].map(makeTag).join(' ');
        const title = getDateText();
        await api.updateTitleAndDescription({ title, description: tagText });

        loadPage(title);
      } else {
        await api.changeLine(createLineInsertions(result.data));
      }
    }
  } catch (e) {
    alert(e);
  }
};
