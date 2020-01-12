import { MyConsoleButton } from './my-console-button/my-console-button.component';
import { MyDebugBoard } from './my-debug-board/my-debug-board.component';
import { MyIcon } from './my-icon/my-icon.component';

let customElementsDefined = false;
export const defineCustomElements = (): void => {
  if (customElementsDefined) {
    return;
  }

  customElements.define(MyConsoleButton.elementName, MyConsoleButton);
  customElements.define(MyDebugBoard.elementName, MyDebugBoard);
  customElements.define(MyIcon.elementName, MyIcon);
  customElementsDefined = true;
};
