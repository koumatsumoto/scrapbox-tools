import {
  changeRoute,
  getCurrentProjectName,
  getDateText,
  getPageUrl,
  getPrivateApi,
  hasEmptyEOF,
  isEmptyPage,
  makeTag,
} from '../../libs/scrapbox';
import { tagOptions } from './config';
import { openDialog } from './dialog';
import { getDateOrTimeText } from './get-date-or-time-text';

export const openDialogAndWriteTags = async () => {
  try {
    const [api, result] = await Promise.all([getPrivateApi(), openDialog({ tagOptions })]);

    if (result.ok) {
      const tagLineText = [getDateOrTimeText(), ...result.data].map(makeTag).join(' ');
      if (isEmptyPage()) {
        const title = getDateText();
        await api.updateTitleAndDescription({ title, description: tagLineText });

        changeRoute(title);
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
