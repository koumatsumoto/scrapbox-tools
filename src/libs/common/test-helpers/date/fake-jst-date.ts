const jstOffset = -540; // UTC+9

/**
 * for testing
 *
 * @param param
 */
export const getFakeJSTDate = (param: number | string) => {
  const date = new Date(param);

  if (date.getTimezoneOffset() === jstOffset) {
    return date;
  } else {
    return new Date(date.getTime() + -jstOffset * 60 * 1000);
  }
};
