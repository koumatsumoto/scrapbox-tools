import { DefaultHttpClient, HttpClient } from './HttpClient';
import { Me, Page, Project } from './types';

const baseURL = 'https://scrapbox.io/api';

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
    return this.httpClient.get<T>(url, {
      headers: {
        Cookie: `connect.sid=${this.token}`,
      },
    });
  }
}
