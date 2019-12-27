import { makeTag } from '../../libs/scrapbox';
import { tagOptions } from './config';
import { openDialog } from './dialog';
import { getDateOrTimeText } from './get-date-or-time-text';

export const openDialogAndSelectTags = async () => {
  try {
    const result = await openDialog({ tagOptions });
    if (result.ok) {
      const text = [getDateOrTimeText(), ...result.data].map(makeTag).join(' ');
      await navigator.clipboard.writeText(text);
    }
  } catch (e) {
    alert(e);
  }
};

const addButton = () => {
  window.scrapbox.PageMenu.addItem({
    title: 'Copy Tag Text',
    onClick: openDialogAndSelectTags,
  });
};

export const copyTagText = () => {
  addButton();
};
