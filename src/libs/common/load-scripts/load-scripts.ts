export const loadScript = async (src: string) =>
  new Promise((resolve, reject) => {
    const elem = document.createElement('script');
    elem.setAttribute('src', src);
    elem.addEventListener('load', (e: Event) => resolve(e), { once: true });
    elem.addEventListener('error', (e: ErrorEvent) => reject(e), { once: true });

    document.body.appendChild(elem);
  });

export const loadScripts = (urls: string[]) => Promise.all(urls.map((u) => loadScript(u)));
