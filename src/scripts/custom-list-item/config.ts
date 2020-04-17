import { findElements } from '../../libs/common/dom';

// change url if want to use other image.
export const defaultImageUrl = 'https://gyazo.com/f1aff01ad67e7abbde1e6a0dffb140ed/thumb/400';
export const tagTextSelectorFn = () => findElements<HTMLElement>('.page-list-item .description .page-link');
export const listItemContentSelectorFn = () => findElements<HTMLElement>('.page-list .page-list-item .content');
export const listItemSelectorFn = () => findElements<HTMLElement>('.page-list .page-list-item');
