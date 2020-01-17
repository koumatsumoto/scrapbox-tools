import { getCurrentPageName, getCurrentProjectName } from '../public-api/scrapbox';
import { PageResponse, ProjectResponse } from './api-client-types';

const baseURL = 'https://scrapbox.io/api';

export class ApiClient {
  async getCurrentPage(): Promise<PageResponse> {
    return this.request<PageResponse>(`${baseURL}/pages/${getCurrentProjectName()}/${getCurrentPageName()}?followRename=true`);
  }

  async getCurrentProject(): Promise<ProjectResponse> {
    return this.request<ProjectResponse>(`${baseURL}/projects/${getCurrentProjectName()}`);
  }

  async request<T>(url: string): Promise<T> {
    const result = await fetch(url);

    return result.json();
  }
}
