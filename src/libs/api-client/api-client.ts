import { RestApiClient } from './rest-api-client/rest-api-client';
import { Project, User } from './rest-api-client/types';
import { ChangeRequestParams } from './websocket-clinet/internal/request';
import { WebsocketClient } from './websocket-clinet/websocket-client';

export class ApiClient {
  constructor(readonly user: User, readonly project: Project, private readonly apiClient: RestApiClient, private readonly websocketClient: WebsocketClient) {}

  async getPage(pageName: string) {
    return this.apiClient.getPage(this.project.name, pageName);
  }

  async changeLine(pageName: string, change: ChangeRequestParams | ChangeRequestParams[]) {
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

  private async commit(param: { projectId: string; pageId: string; commitId: string; changes: ChangeRequestParams[] }) {
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
