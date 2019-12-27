const svg = {
  viewModules: (size: string | number) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M5 11h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm0 7h3c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm6 0h3c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm6 0h3c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm-6-7h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm5-5v4c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1z"/></svg>`,
};

export type SupportedType = 'view_modules' | string;
export type SupportedPropertyName = 'type' | 'size' | string;

export class MyIcon extends HTMLElement {
  static elementName = 'my-icon';
  static defaultSize = '24';

  get size() {
    return this.getAttribute('size') as string;
  }

  set size(newValue: string) {
    this.setAttribute('size', newValue);
    this.applySize(newValue);
  }

  get type() {
    return this.getAttribute('type') as SupportedType;
  }

  set type(newValue: SupportedType) {
    this.setAttribute('type', newValue);
  }

  constructor() {
    super();

    this.size = this.size || MyIcon.defaultSize;
    this.applySize(this.size);

    this.render();
  }

  attributeChangedCallback(name: SupportedPropertyName, oldValue: string, newValue: string) {
    switch (name) {
      case 'type': {
        this.type = newValue;
        break;
      }
      case 'size': {
        this.size = newValue;
        break;
      }
    }

    this.render();
  }

  private render() {
    switch (this.type) {
      case 'view_modules': {
        return (this.innerHTML = svg.viewModules(this.size));
      }
      default: {
        return (this.innerHTML = '');
      }
    }
  }

  private applySize(val: string) {
    this.style.width = `${val}px`;
    this.style.height = `${val}px`;
  }
}
