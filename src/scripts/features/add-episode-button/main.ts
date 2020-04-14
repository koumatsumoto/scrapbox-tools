import { createElement } from '../../../libs/common/dom';
import { DomManipulator } from '../../../libs/scrapbox/dom/dom-manipulator';
import { openDialogAndWriteTags } from '../../tag-automation';

const createAddEpisodeButton = () => {
  return createElement({
    tag: 'button',
    contents: 'Add Episode',
    class: 'sx-add-episode-button',
    onClick: (ev) => {
      ev.stopPropagation();
      openDialogAndWriteTags();
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
