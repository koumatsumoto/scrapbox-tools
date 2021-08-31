export const isIntegerString = (value: string) => Number.isInteger(Number.parseInt(value));

export const getAuthCookieValue = (token: string) => `connect.sid=${token}`;

export const isNotNull = <T>(value: T): value is NonNullable<T> => value !== null;
