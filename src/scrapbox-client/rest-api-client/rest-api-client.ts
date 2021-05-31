import { DefaultHttpClient, HttpClient } from './http-client';
import { Me, Page, Project } from './types';

const baseURL = 'https://scrapbox.io/api';

export const isObject = (data: unknown): data is Record<string, unknown> => typeof data === 'object' && data !== null;
export const isNotLoggedInError = (data: unknown) => isObject(data) && data['name'] === 'NotLoggedInError';

export class RestApiClient {
  constructor(private readonly token?: string, private readonly httpClient: HttpClient = new DefaultHttpClient()) {}

  async getPage(projectName: string, pageName: string) {
    return this.request<Page>(`${baseURL}/pages/${encodeURIComponent(projectName)}/${encodeURIComponent(pageName)}?followRename=true`);
  }

  async getProject(projectName: string) {
    return this.request<Project>(`${baseURL}/projects/${encodeURIComponent(projectName)}`);
  }

  async getMe() {
    return this.request<Me>(`${baseURL}/users/me`);
  }

  private async request<T>(url: string) {
    const result = await this.httpClient.get<T>(url, {
      headers: {
        Cookie: `connect.sid=${this.token}`,
      },
    });

    if (isNotLoggedInError(result)) {
      throw new Error('NotLoggedInError');
    }

    return result;
  }
}
