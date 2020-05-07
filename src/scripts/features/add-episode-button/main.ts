import { createElement } from '../../../libs/common/dom';
import { alertOnFail } from '../../../libs/common/process';
import { DomManipulator } from '../../../libs/scrapbox/dom/dom-manipulator';
import { handleFormAndDialog } from './handle-form-and-dialog';

const createAddEpisodeButton = () => {
  return createElement({
    tag: 'button',
    contents: 'Add Episode',
    class: 'sx-add-episode-button',
    onClick: (ev) => {
      ev.stopPropagation();
      alertOnFail(handleFormAndDialog);
    },
  });
};

export const attachAddEpisodeButton = () => {
  // for page bottom
  DomManipulator.getPageContainer().appendChild(createAddEpisodeButton());
};

export const useAddEpisodeButton = () => {
  // no need to attach new button on page change.
  // scrapbox.io don't clear DOM of page container.
  attachAddEpisodeButton();
};
