import { RestApiClient } from './rest-api-client/rest-api-client';
import { ChangeRequestParams } from './websocket-clinet/internal/request';
import { WebsocketClient } from './websocket-clinet/websocket-client';

export class ApiClient {
  constructor(
    readonly userId: string,
    readonly projectId: string,
    readonly projectName: string,
    private readonly apiClient: RestApiClient = new RestApiClient(),
    private readonly websocketClient: WebsocketClient = new WebsocketClient(),
  ) {}

  async getPage(pageName: string) {
    return this.apiClient.getPage(this.projectName, pageName);
  }

  async changeLine(pageName: string, change: ChangeRequestParams | ChangeRequestParams[]) {
    const { pageId, commitId } = await this.getPageIdAndCommitId(pageName);

    return this.commit({
      changes: Array.isArray(change) ? change : [change],
      projectId: this.projectId,
      pageId: pageId,
      commitId: commitId,
    });
  }

  private async getPageIdAndCommitId(pageName: string) {
    const page = await this.apiClient.getPage(this.projectName, pageName);

    return { pageId: page.id, commitId: page.commitId };
  }

  private async commit(param: { projectId: string; pageId: string; commitId: string; changes: ChangeRequestParams[] }) {
    // to receive result of commit
    await this.websocketClient.join({ projectId: param.projectId, pageId: param.pageId });

    return this.websocketClient.commit({
      userId: this.userId,
      projectId: param.projectId,
      pageId: param.pageId,
      parentId: param.commitId,
      changes: param.changes,
    });
  }
}
