export const isBrowser = () => typeof window !== 'undefined';
export const isNode = () => typeof module !== 'undefined' && !!module.exports;
