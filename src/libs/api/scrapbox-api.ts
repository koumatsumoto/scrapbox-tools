import { RestApi } from './rest-api';
import { ChangeRequest, ScrapboxWebsocketHandler } from './websocket';

export class ScrapboxApi {
  constructor(
    token = '',
    debug = false,
    private readonly restApi: RestApi = new RestApi(token),
    private readonly websocketHandler: ScrapboxWebsocketHandler = new ScrapboxWebsocketHandler({ token, debug }),
  ) {}

  async getPage(projectName: string, pageName: string) {
    return this.restApi.getPage(projectName, pageName);
  }

  async changeLine(projectName: string, pageName: string, change: ChangeRequest | ChangeRequest[]) {
    const project = await this.getProject(projectName);
    const { pageId, commitId } = await this.getPageIdAndCommitId(projectName, pageName);

    await this.commit({
      changes: Array.isArray(change) ? change : [change],
      projectId: project.id,
      pageId: pageId,
      commitId: commitId,
    });
  }

  async getUser() {
    return await this.restApi.getMe();
  }

  closeConnection() {
    this.websocketHandler.close();
  }

  private async getProject(projectName: string) {
    return await this.restApi.getProject(projectName);
  }

  private async getPageIdAndCommitId(projectName: string, pageName: string) {
    const page = await this.restApi.getPage(projectName, pageName);

    return { pageId: page.id, commitId: page.commitId };
  }

  private async commit(param: { projectId: string; pageId: string; commitId: string; changes: ChangeRequest[] }) {
    const user = await this.getUser();

    return this.websocketHandler.commit({
      userId: user.id,
      projectId: param.projectId,
      pageId: param.pageId,
      parentId: param.commitId,
      changes: param.changes,
    });
  }
}
