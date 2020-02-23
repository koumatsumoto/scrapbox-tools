import { MyConsoleButton } from '../../components';
import { componentManager } from '../component-manager';
import { openDialogAndWriteTags } from '../tag-automation';

export const setupConsoleButton = () => {
  const button = componentManager.getInstance(MyConsoleButton);

  button.setAction(openDialogAndWriteTags);
};
