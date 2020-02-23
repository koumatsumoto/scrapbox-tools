import { MyConsoleButton } from '../../components';
import { getScrapbox, loadPage } from '../../libs/scrapbox/public-api';
import { getDateText } from '../../libs/scrapbox/text';
import { componentManager } from '../component-manager';
import { openDialogAndWriteTags } from '../tag-automation';

const action = () => {
  switch (getScrapbox().Layout) {
    case 'page': {
      return openDialogAndWriteTags();
    }
    default: {
      return loadPage(getDateText());
    }
  }
};

export const setupConsoleButton = () => {
  const button = componentManager.getInstance(MyConsoleButton);

  button.setAction(action);
};
