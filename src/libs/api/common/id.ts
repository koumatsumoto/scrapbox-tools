export type ID = string;

// copied from official index.js
export const isIdString = (v: string): v is ID => {
  return /^[a-f\d]{24,32}$/.test(v);
};

// modified original toString16 of official index.js
const toString16 = (userIdOrNumber: number | string, length: number) => {
  const hexOrId = userIdOrNumber.toString(16);

  return hexOrId.length > length ? hexOrId.slice(hexOrId.length - length) : '0'.repeat(length - hexOrId.length) + hexOrId;
};

// modified original IdGenerator of official index.js
type IdGenerator = () => ID;

export const createIdGenerator = (userId: string): IdGenerator => {
  let counter = Math.floor(16777215 * Math.random());

  return () => {
    const t = Math.floor(Date.now() / 1e3);
    if ((counter += 1) > 16777215) {
      counter = 0;
    }

    return (toString16(t, 8) + toString16(userId, 6) + toString16(0, 4) + toString16(counter, 6)) as ID;
  };
};
