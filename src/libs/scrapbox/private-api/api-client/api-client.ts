import { getCurrentPageName, getCurrentProjectName } from '../../public-api/scrapbox';
import { MeResponse, PageResponse, ProjectResponse } from './api-client-types';

const baseURL = 'https://scrapbox.io/api';

export class ApiClient {
  async getPage(title: string): Promise<PageResponse> {
    return this.request<PageResponse>(
      `${baseURL}/pages/${encodeURIComponent(getCurrentProjectName())}/${encodeURIComponent(title)}?followRename=true`,
    );
  }

  async getCurrentPage(): Promise<PageResponse | null> {
    const pageName = getCurrentPageName();
    if (!pageName) {
      return null;
    }

    return this.request<PageResponse>(
      `${baseURL}/pages/${encodeURIComponent(getCurrentProjectName())}/${encodeURIComponent(pageName)}?followRename=true`,
    );
  }

  async getCurrentProject(): Promise<ProjectResponse> {
    return this.request<ProjectResponse>(`${baseURL}/projects/${encodeURIComponent(getCurrentProjectName())}`);
  }

  async getMe(): Promise<MeResponse> {
    return this.request<MeResponse>(`${baseURL}/users/me`);
  }

  async request<T>(url: string): Promise<T> {
    const result = await fetch(url);

    return result.json();
  }
}
