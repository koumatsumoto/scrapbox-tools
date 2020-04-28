import { ApiClient } from './api-client/api-client';
import { ProjectResponse, User } from './api-client/api-client-types';
import { CommitChangeParam } from './websocket-clinet';
import { WebsocketClient } from './websocket-clinet/websocket-client';

export class ApiManager {
  constructor(
    readonly user: User,
    readonly project: ProjectResponse,
    private readonly apiClient: ApiClient,
    private readonly websocketClient: WebsocketClient,
  ) {}

  async getCurrentPage() {
    const page = await this.apiClient.getCurrentPage();
    if (page == null) {
      throw new Error('current layout is not page');
    }

    return page;
  }

  async changeLine(param: { pageId: string; commitId: string; change: CommitChangeParam | CommitChangeParam[] }) {
    return this.commit({
      changes: Array.isArray(param.change) ? param.change : [param.change],
      projectId: this.project.id,
      pageId: param.pageId,
      commitId: param.commitId,
    });
  }

  async changeLineOfCurrentPage(change: CommitChangeParam | CommitChangeParam[]) {
    const page = await this.getCurrentPage();

    return this.changeLine({
      pageId: page.id,
      commitId: page.commitId,
      change,
    });
  }

  private async commit(param: { projectId: string; pageId: string; commitId: string; changes: CommitChangeParam[] }) {
    // to receive result of commit
    await this.websocketClient.joinRoom({ projectId: this.project.id, pageId: param.pageId });

    return this.websocketClient.commit({
      userId: this.user.id,
      projectId: param.projectId,
      pageId: param.pageId,
      parentId: param.commitId,
      changes: param.changes,
    });
  }
}

export const getApiManagerFn = () => {
  let manager: ApiManager | null = null;

  return async () => {
    if (manager) {
      return manager;
    }

    const api = new ApiClient();
    const websocket = new WebsocketClient();
    const [user, project] = await Promise.all([api.getMe(), api.getCurrentProject()]);
    // for debug purpose
    (window as any).api = api;

    return (manager = new ApiManager(user, project, api, websocket));
  };
};

// singleton
export const getApiManager = getApiManagerFn();
