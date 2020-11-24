export const isNode = () => typeof module !== 'undefined' && !!module.exports;
export const isBrowser = () => !isNode();
