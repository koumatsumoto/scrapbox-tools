import { ISOString, LocaleString, Timestamp } from '../types';

export const getTime = () => Date.now() as Timestamp;
export const getISOString = () => new Date().toISOString() as ISOString;
export const getJSTString = () => new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }) as LocaleString;
