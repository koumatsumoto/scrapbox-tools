const html = require('./loading-indicator.component.html');

export class SxLoadingIndicatorComponent extends HTMLElement {
  static readonly elementName = 'sx-loading-indicator';

  constructor() {
    super();

    this.innerHTML = `${html}`;
  }
}
