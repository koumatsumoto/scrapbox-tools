import { isBrowser } from '../common/env';

// NOTE: use bind(window) to resolve `Illegal invocation` error
export const fetch = isBrowser() ? globalThis.fetch.bind(window) : (require('node-fetch') as typeof globalThis.fetch);

export type HttpClient = {
  get<T>(url: string, options?: Partial<{ headers: Record<string, string> }>): Promise<T>;
};

export class DefaultHttpClient implements HttpClient {
  constructor(private readonly fetchFn = fetch) {}

  async get<T>(url: string, options: Partial<{ headers: Record<string, string> }> = {}) {
    const result = await this.fetchFn(url, options);

    return (await result.json()) as Promise<T>;
  }
}
