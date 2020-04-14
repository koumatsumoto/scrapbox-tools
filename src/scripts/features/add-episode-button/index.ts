import { createElement } from '../../../libs/common/dom';
import { DomManipulator } from '../../../libs/scrapbox/dom/dom-manipulator';
import { Router } from '../../../libs/scrapbox/router';
import { openDialogAndWriteTags } from '../../tag-automation';

const createAddEpisodeButton = (subclass: 'for-title-right' | 'for-editor-bottom') => {
  return createElement({
    tag: 'button',
    contents: 'Add Episode',
    class: ['sx-add-episode-button', subclass],
    onClick: (ev) => {
      ev.stopPropagation();
      openDialogAndWriteTags();
    },
  });
};

export const attachAddEpisodeButton = () => {
  // for title right side
  DomManipulator.getTitleLine().appendChild(createAddEpisodeButton('for-title-right'));

  // for page bottom
  DomManipulator.getPageContainer().appendChild(createAddEpisodeButton('for-editor-bottom'));
};

export const useAddEpisodeButton = () => {
  attachAddEpisodeButton(); // initial page
  Router.onPageChange(attachAddEpisodeButton);
};
