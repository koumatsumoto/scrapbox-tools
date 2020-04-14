type AllowedTag = 'button' | 'div';

export const createElement = <K extends Extract<keyof HTMLElementTagNameMap, AllowedTag>>(param: {
  tag: K;
  contents?: string; // TODO: also allow Element
  class?: string | string[];
  onClick?: (this: HTMLElementTagNameMap[K], ev: Event) => any;
}): HTMLElementTagNameMap[K] => {
  const e = document.createElement<K>(param.tag);

  if (param.contents) {
    e.innerHTML = param.contents;
  }

  if (param.class) {
    if (typeof param.class === 'string') {
      e.classList.add(param.class);
    } else {
      e.classList.add(...param.class);
    }
  }

  if (param.onClick) {
    e.addEventListener('click', param.onClick);
  }

  return e;
};
