export const fetch: typeof globalThis.fetch = globalThis.fetch ? globalThis.fetch : require('node-fetch');
