import { getDateText, getPrivateApi, hasEmptyEOF, isEmptyPage, makeTag } from '../../libs/scrapbox';
import { tagOptions } from './config';
import { openDialog } from './dialog';
import { getDateOrTimeText } from './get-date-or-time-text';

export const openDialogAndWriteTags = async () => {
  try {
    const [api, result] = await Promise.all([getPrivateApi(), openDialog({ tagOptions })]);

    if (result.ok) {
      const tagLineText = [getDateOrTimeText(), ...result.data].map(makeTag).join(' ');
      if (isEmptyPage()) {
        await api.updateTitle({ title: getDateText() });
        await api.updateDescription({ description: tagLineText });
      } else {
        if (!hasEmptyEOF()) {
          await api.insertSingleLineIntoCurrentPage({ text: '' });
        }
        await api.insertSingleLineIntoCurrentPage({ text: tagLineText });
        await api.insertSingleLineIntoCurrentPage({ text: '' });
      }
    }
  } catch (e) {
    alert(e);
  }
};
