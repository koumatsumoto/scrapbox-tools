import { constants } from '../common';
import { DefaultHttpClient, HttpClient } from './http-client';
import { Me, Page, Project, ProjectPublicData } from './types';

export const isObject = (data: unknown): data is Record<string, unknown> => typeof data === 'object' && data !== null;
export const isNotLoggedInError = (data: unknown) => isObject(data) && data['name'] === 'NotLoggedInError';

export class RestApi {
  constructor(private readonly token?: string, private readonly httpClient: HttpClient = new DefaultHttpClient()) {}

  async getPage(projectName: string, pageName: string) {
    return this.request<Page>(`${constants.rest.baseUrl}/pages/${encodeURIComponent(projectName)}/${encodeURIComponent(pageName)}?followRename=true`);
  }

  async getProject(projectName: string) {
    return this.request<Project>(`${constants.rest.baseUrl}/projects/${encodeURIComponent(projectName)}`);
  }

  async getProjects() {
    return this.request<{ projects: ProjectPublicData[] }>(`${constants.rest.baseUrl}/projects`);
  }

  async getMe() {
    return this.request<Me>(`${constants.rest.baseUrl}/users/me`);
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
