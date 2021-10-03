import { constants } from '../common';
import { DefaultHttpClient, HttpClient } from './http-client';
import { Me, Page, Project, ProjectPublicData } from './types';

const errors = {
  SessionError: 'SessionError',
  NotLoggedInError: 'NotLoggedInError',
};
export const isObject = (data: unknown): data is Record<string, unknown> => typeof data === 'object' && data !== null;
export const isError = (data: unknown): data is { name: keyof typeof errors } => isObject(data) && typeof data['name'] === 'string' && data['name'] in errors;
export const handleError = async <T>(result: T) => {
  return isError(result) ? Promise.reject(result) : result;
};

export class RestApi {
  get cookie() {
    return `connect.sid=${this.token}`;
  }

  constructor(private readonly token?: string, private readonly httpClient: HttpClient = new DefaultHttpClient(), private errorHandler = handleError) {}

  async getPage(projectName: string, pageName: string) {
    return this.get<Page>(`${constants.rest.baseUrl}/pages/${encodeURIComponent(projectName)}/${encodeURIComponent(pageName)}?followRename=true`);
  }

  async getProject(projectName: string) {
    return this.get<Project>(`${constants.rest.baseUrl}/projects/${encodeURIComponent(projectName)}`);
  }

  async getProjects() {
    return this.get<{ projects: ProjectPublicData[] }>(`${constants.rest.baseUrl}/projects`);
  }

  async getMe() {
    return this.get<Me>(`${constants.rest.baseUrl}/users/me`);
  }

  async replaceLinks(projectName: string, data: { from: string; to: string }) {
    return this.#post(`${constants.rest.baseUrl}/pages/${encodeURIComponent(projectName)}/replace/links`, data);
  }

  private async get<T>(url: string) {
    return this.httpClient.get<T>(url, { headers: { Cookie: this.cookie } }).then(this.errorHandler);
  }

  // TODO(feat): resolve CSRF error
  async #post<T>(url: string, data: unknown) {
    return this.httpClient.post<T>(url, JSON.stringify(data), { headers: { Cookie: this.cookie } }).then(this.errorHandler);
  }
}
