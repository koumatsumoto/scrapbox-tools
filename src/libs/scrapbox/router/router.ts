import { onPageChange } from './internal/on-page-change';

export class Router {
  static onPageChange(callback: (title: string | null) => any) {
    onPageChange(callback);
  }
}
