export const isIntegerString = (value: string) => Number.isInteger(Number.parseInt(value));

export const getCookieToAuth = (token: string) => `connect.sid=${token}`;
