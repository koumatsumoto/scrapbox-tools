import { MeResponse, PageResponse, ProjectResponse } from './rest-api-client-types';

const baseURL = 'https://scrapbox.io/api';

export class RestApiClient {
  async getPage(project: string, page: string): Promise<PageResponse> {
    return this.request<PageResponse>(`${baseURL}/pages/${encodeURIComponent(project)}/${encodeURIComponent(page)}?followRename=true`);
  }

  async getProject(project: string): Promise<ProjectResponse> {
    return this.request<ProjectResponse>(`${baseURL}/projects/${encodeURIComponent(project)}`);
  }

  async getMe(): Promise<MeResponse> {
    return this.request<MeResponse>(`${baseURL}/users/me`);
  }

  async request<T>(url: string): Promise<T> {
    const result = await fetch(url);

    return result.json();
  }
}
