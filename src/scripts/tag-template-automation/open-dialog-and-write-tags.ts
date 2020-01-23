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
        await api.updateTitleAndDescription({ title: getDateText(), description: tagLineText });
      } else {
        const changes: { text: string }[] = [];
        if (!hasEmptyEOF()) {
          changes.push({ text: '' });
        }
        changes.push({ text: tagLineText });
        changes.push({ text: '' });

        await api.insertLine(changes);
      }
    }
  } catch (e) {
    alert(e);
  }
};
