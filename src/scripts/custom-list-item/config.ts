import { getElements } from '../../libs/common/dom';

// change url if want to use other image.
export const defaultImageUrl = 'https://gyazo.com/c263363c71b86f25f1bcf8fbc3e78510/thumb/400';
export const tagTextSelectorFn = () => getElements<HTMLElement>('.page-list-item .description .page-link');
export const listItemContentSelectorFn = () => getElements<HTMLElement>('.page-list .page-list-item .content');
