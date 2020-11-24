export const isNode = () => typeof window === 'undefined' || (typeof module !== 'undefined' && !!module.exports);
export const isBrowser = () => !isNode();
