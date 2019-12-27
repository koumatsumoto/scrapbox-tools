import * as puppeteer from 'puppeteer';
import { getLastUpdatedDate } from './get-last-updated-date';
const addMinutes = require('date-fns/addMinutes');
const isAfter = require('date-fns/isAfter');

export const isPageUpdatedWithinOneMinute = async (page: puppeteer.Page) => {
  const lastUpdatedTime = await getLastUpdatedDate(page);
  const oneMinuteAgo = addMinutes(new Date(), -1);

  return isAfter(lastUpdatedTime, oneMinuteAgo);
};
