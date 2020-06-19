import { SxDialogComponent } from '../../../libs/components/dialog';
import { getGlobalScrapboxApi } from '../../../libs/scrapbox/api';
import {
  getCurrentPageName,
  getCurrentProjectName,
  getFirstLineOrFail,
  isEmptyPage,
  isTitleOnlyPage,
  loadPage,
} from '../../../libs/scrapbox/browser-api';
import { defineElementsIfNeeded } from './form/define-elements-if-needed';
import { SxAddEpisodeFormComponent } from './form/form.component';
import { getConfigOrFail } from './form/get-config-or-fail';
import { SxLoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { makeInsertParams } from './make-insert-params/make-insert-params';

export const handleFormAndDialog = async () => {
  defineElementsIfNeeded();
  const tags = await getConfigOrFail();
  const api = await getGlobalScrapboxApi(getCurrentProjectName());
  const dialog = new SxDialogComponent();
  const form = new SxAddEpisodeFormComponent(tags);
  const loading = new SxLoadingIndicatorComponent();

  dialog.setContent(form);
  dialog.open();

  const formResult = await form.result; // wait for form submitted
  // form canceled
  if (formResult === null) {
    dialog.close();
    return;
  }

  // FIXME: scrapbox editor can not receive line changes if title-only page.
  const needReloadAfterUpdation = isEmptyPage() || isTitleOnlyPage();

  // show loading indicator while api request
  dialog.setContent(loading);
  const pageName = getCurrentPageName();
  if (!pageName) {
    throw new Error('Page name not found');
  }
  await api.changeLine(pageName, makeInsertParams(formResult));

  const titleLine = getFirstLineOrFail();
  const title = titleLine.text;

  if (needReloadAfterUpdation) {
    loadPage(title);
  }

  dialog.close();
};
