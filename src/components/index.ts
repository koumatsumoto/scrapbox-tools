import { MyConsoleButton } from './my-console-button/my-console-button.component';
import { MyIcon } from './my-icon/my-icon.component';

let customElementDefined = false;
export const defineCustomElements = () => {
  if (customElementDefined) {
    return;
  }

  customElements.define(MyConsoleButton.elementName, MyConsoleButton);
  customElements.define(MyIcon.elementName, MyIcon);
  customElementDefined = true;
};

export const appendConsoleButton = () => {
  defineCustomElements();

  const elem = new MyConsoleButton();
  document.body.appendChild(elem);
};
