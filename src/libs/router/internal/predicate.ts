import { RouterEvent } from '../types';

export const isSameUrl = (a: RouterEvent, b: RouterEvent) => a.data.url === b.data.url;
