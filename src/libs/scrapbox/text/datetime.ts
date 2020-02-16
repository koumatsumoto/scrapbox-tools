export const scrapboxCustomFormat = {
  date: /^\d{4}\/\d{2}\/\d{2}$/,
  time: /^\d{2}:\d{2}/,
};

// only for values from date getter function, e.g. date.getMonth(), date.getDate()
const zerofill = (num: number) => (`${num}`.length < 2 ? `0${num}` : `${num}`);

export const getFormattedDateString = (date: Date) => `${date.getFullYear()}/${zerofill(date.getMonth() + 1)}/${zerofill(date.getDate())}`;

export const getFormattedTimeString = (date: Date) => {
  const hoursStr = zerofill(date.getHours());
  const minutes = date.getMinutes();
  const minutesStr = minutes < 30 ? '00' : '30';

  return `${hoursStr}:${minutesStr}`;
};

export const getDateText = (date: Date = new Date()) => getFormattedDateString(date);
export const getTimeText = (date: Date = new Date()) => getFormattedTimeString(date);

export const isDiaryPageTitle = (title: string) => scrapboxCustomFormat.date.test(title);
