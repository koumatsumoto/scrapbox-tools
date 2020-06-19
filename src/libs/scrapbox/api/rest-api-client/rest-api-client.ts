import { fetch } from './fetch';
import { MeResponse, PageResponse, ProjectResponse } from './rest-api-client-types';

const baseURL = 'https://scrapbox.io/api';

export class RestApiClient {
  constructor(private readonly token?: string) {}

  async getPage(projectName: string, pageName: string): Promise<PageResponse> {
    return this.request<PageResponse>(
      `${baseURL}/pages/${encodeURIComponent(projectName)}/${encodeURIComponent(pageName)}?followRename=true`,
    );
  }

  async getProject(projectName: string): Promise<ProjectResponse> {
    return this.request<ProjectResponse>(`${baseURL}/projects/${encodeURIComponent(projectName)}`);
  }

  async getMe(): Promise<MeResponse> {
    return this.request<MeResponse>(`${baseURL}/users/me`);
  }

  async request<T>(url: string): Promise<T> {
    const options = this.token
      ? {
          headers: {
            Cookie: `connect.sid=${this.token}`,
          },
        }
      : undefined;

    const result = await fetch(url, options);
    const json = await result.json();

    if (!result.ok) {
      throw new Error(JSON.stringify(json));
    }

    return json;
  }
}
