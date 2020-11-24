import { RestApiClient } from './rest-api-client/rest-api-client';
import { ChangeRequestCreateParams } from './websocket-clinet/internal/request';
import { WebsocketClient } from './websocket-clinet/websocket-client';

export class ScrapboxClient {
  constructor(
    private readonly userId: string,
    private readonly projectId: string,
    private readonly projectName: string,
    private readonly apiClient: RestApiClient,
    private readonly websocketClient: WebsocketClient,
  ) {}

  async getPage(pageName: string) {
    return this.apiClient.getPage(this.projectName, pageName);
  }

  async changeLine(pageName: string, change: ChangeRequestCreateParams | ChangeRequestCreateParams[]) {
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

  private async commit(param: { projectId: string; pageId: string; commitId: string; changes: ChangeRequestCreateParams[] }) {
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
