import { SxDialogComponent } from '../../../../libs/components/dialog';
import { SxLoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';
import { SxAddEpisodeFormComponent } from './form.component';

// TODO: use decorator to management customElements.define
const getDefineElementsFn = () => {
  let dialogDefined = false;
  let formDefined = false;
  let loadingIndicatorDefined = false;

  return () => {
    if (!dialogDefined) {
      customElements.define(SxDialogComponent.elementName, SxDialogComponent);
      dialogDefined = true;
    }
    if (!formDefined) {
      customElements.define(SxAddEpisodeFormComponent.elementName, SxAddEpisodeFormComponent);
      formDefined = true;
    }
    if (!loadingIndicatorDefined) {
      customElements.define(SxLoadingIndicatorComponent.elementName, SxLoadingIndicatorComponent);
      loadingIndicatorDefined = true;
    }
  };
};

export const defineElementsIfNeeded = getDefineElementsFn();
