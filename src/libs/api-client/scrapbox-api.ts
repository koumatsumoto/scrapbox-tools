import { RestApiClient } from './rest-api-client/rest-api-client';
import { ProjectResponse, User } from './rest-api-client/rest-api-client-types';
import { CommitChangeParam } from './websocket-clinet';
import { WebsocketClient } from './websocket-clinet/websocket-client';

export class ScrapboxApi {
  constructor(
    readonly user: User,
    readonly project: ProjectResponse,
    private readonly apiClient: RestApiClient,
    private readonly websocketClient: WebsocketClient,
  ) {}

  async getPage(pageName: string) {
    return this.apiClient.getPage(this.project.name, pageName);
  }

  async changeLine(pageName: string, change: CommitChangeParam | CommitChangeParam[]) {
    const { pageId, commitId } = await this.getPageIdAndCommitId(pageName);

    return this.commit({
      changes: Array.isArray(change) ? change : [change],
      projectId: this.project.id,
      pageId: pageId,
      commitId: commitId,
    });
  }

  private async getPageIdAndCommitId(pageName: string) {
    const page = await this.apiClient.getPage(this.project.name, pageName);

    return { pageId: page.id, commitId: page.commitId };
  }

  private async commit(param: { projectId: string; pageId: string; commitId: string; changes: CommitChangeParam[] }) {
    // to receive result of commit
    // await this.websocketClient.joinRoom({ projectId: param.projectId, pageId: param.pageId });

    return this.websocketClient.commit({
      userId: this.user.id,
      projectId: param.projectId,
      pageId: param.pageId,
      parentId: param.commitId,
      changes: param.changes,
    });
  }
}

export const getGlobalScrapboxApiFn = () => {
  let api: ScrapboxApi | null = null;

  return async (projectName: string, token?: string) => {
    if (api) {
      return api;
    }

    const restApi = new RestApiClient(token);
    const websocket = new WebsocketClient(token);
    const [user, project] = await Promise.all([restApi.getMe(), restApi.getProject(projectName)]);

    // failed to login
    if (user.isGuest) {
      throw new Error('Authentication Error, cookie may not be set');
    }
    // for debug purpose
    (globalThis as any).api = restApi;

    return (api = new ScrapboxApi(user, project, restApi, websocket));
  };
};

// singleton
export const getGlobalScrapboxApi = getGlobalScrapboxApiFn();
