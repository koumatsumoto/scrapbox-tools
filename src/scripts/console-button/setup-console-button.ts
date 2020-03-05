import { MyConsoleButton } from '../../components';
import { getPrivateApi } from '../../libs/scrapbox/private-api';
import { loadPage } from '../../libs/scrapbox/public-api';
import { getScrapboxObserver } from '../../libs/scrapbox/public-api/observer';
import { getDateText } from '../../libs/scrapbox/text';
import { componentManager } from '../component-manager';
import { openDialogAndWriteTags } from '../tag-automation';

export const setupConsoleButton = async () => {
  const scrapboxObserver = getScrapboxObserver();
  const button = componentManager.getInstance(MyConsoleButton);

  // change icon when layout change
  scrapboxObserver.layout$.subscribe((layout) => {
    switch (layout) {
      case 'page': {
        return button.setState({
          icon: 'apps',
          action: openDialogAndWriteTags,
        });
      }
      default: {
        return button.setState({
          icon: 'add',
          action: () => loadPage(getDateText()),
        });
      }
    }
  });

  // disable button during requesting to server
  const api = await getPrivateApi();
  api.requestStatus$.subscribe((state) => {
    switch (state) {
      case 'request start': {
        button.setState({ icon: 'clear' });

        break;
      }
      case 'request end': {
        button.setState({ icon: 'apps' });

        break;
      }
    }
  });
};
