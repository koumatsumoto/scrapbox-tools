import { getElements } from '../../libs/common/dom';

export const selectNewButtons = () => getElements<HTMLAnchorElement>('a.new-button');
