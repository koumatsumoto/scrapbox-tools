import { RestApiClient } from './rest-api-client/rest-api-client';
import { ChangeRequestCreateParams } from './websocket-clinet/internal/request';
import { WebsocketClient } from './websocket-clinet/websocket-client';

export class ScrapboxClient {
  constructor(
    token = '',
    private readonly apiClient: RestApiClient = new RestApiClient(token),
    private readonly websocketClient: WebsocketClient = new WebsocketClient({ token }),
  ) {}

  async getPage(projectName: string, pageName: string) {
    return this.apiClient.getPage(projectName, pageName);
  }

  async changeLine(projectName: string, pageName: string, change: ChangeRequestCreateParams | ChangeRequestCreateParams[]) {
    const project = await this.getProject(projectName);
    const { pageId, commitId } = await this.getPageIdAndCommitId(projectName, pageName);

    return this.commit({
      changes: Array.isArray(change) ? change : [change],
      projectId: project.id,
      pageId: pageId,
      commitId: commitId,
    });
  }

  async getUser() {
    return await this.apiClient.getMe();
  }

  private async getProject(projectName: string) {
    return await this.apiClient.getProject(projectName);
  }

  private async getPageIdAndCommitId(projectName: string, pageName: string) {
    const page = await this.apiClient.getPage(projectName, pageName);

    return { pageId: page.id, commitId: page.commitId };
  }

  private async commit(param: { projectId: string; pageId: string; commitId: string; changes: ChangeRequestCreateParams[] }) {
    const user = await this.getUser();
    // to receive result of commit
    await this.websocketClient.join({ projectId: param.projectId, pageId: param.pageId });

    return this.websocketClient.commit({
      userId: user.id,
      projectId: param.projectId,
      pageId: param.pageId,
      parentId: param.commitId,
      changes: param.changes,
    });
  }
}
