import { RestApiClient } from './rest-api-client/rest-api-client';
import { User } from './rest-api-client/rest-api-client-types';
import { CommitChangeParam } from './websocket-clinet';
import { WebsocketClient } from './websocket-clinet/websocket-client';

export class ScrapboxApi {
  constructor(
    readonly user: User,
    readonly projectId: string,
    private readonly apiClient: RestApiClient,
    private readonly websocketClient: WebsocketClient,
  ) {}

  async changeLine(pageName: string, change: CommitChangeParam | CommitChangeParam[]) {
    const { pageId, commitId } = await this.getPageIdAndCommitId(pageName);

    return this.commit({
      changes: Array.isArray(change) ? change : [change],
      projectId: this.projectId,
      pageId: pageId,
      commitId: commitId,
    });
  }

  private async getPageIdAndCommitId(pageName: string) {
    const page = await this.apiClient.getPage(this.projectId, pageName);

    return { pageId: page.id, commitId: page.commitId };
  }

  private async commit(param: { projectId: string; pageId: string; commitId: string; changes: CommitChangeParam[] }) {
    // to receive result of commit
    await this.websocketClient.joinRoom({ projectId: this.projectId, pageId: param.pageId });

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
  let manager: ScrapboxApi | null = null;

  return async (projectId: string) => {
    if (manager) {
      return manager;
    }

    const api = new RestApiClient();
    const websocket = new WebsocketClient();
    const user = await api.getMe();
    // for debug purpose
    (window as any).api = api;

    return (manager = new ScrapboxApi(user, projectId, api, websocket));
  };
};

// singleton
export const getGlobalScrapboxApi = getGlobalScrapboxApiFn();
