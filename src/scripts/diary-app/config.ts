import { findElements } from '../../libs/common/dom';

export const selectNewButtons = () => findElements<HTMLAnchorElement>('a.new-button');
