import { generateId, ID } from '../public-api';
import { ApiClient } from './api-client/api-client';
import { CommitChangeParam, WebsocketClient } from './websocket-clinet';

export class PrivateApi {
  constructor(private readonly userId: ID, private readonly apiClient: ApiClient, private readonly websocketClient: WebsocketClient) {}

  async insertSingleLineIntoCurrentPage(param: { position?: ID; text: string }) {
    const [project, page] = await Promise.all([this.apiClient.getCurrentProject(), this.apiClient.getCurrentPage()]);

    return this.changeLines({
      changes: [{ type: 'insert', id: generateId(this.userId), position: param.position, text: param.text }],
      projectId: project.id,
      pageId: page.id,
      commitId: page.commitId,
    });
  }

  async updateSingleLineOfCurrentPage(param: { id: ID; text: string }) {
    const [project, page] = await Promise.all([this.apiClient.getCurrentProject(), this.apiClient.getCurrentPage()]);

    return this.changeLines({
      changes: [{ type: 'update', id: param.id, text: param.text }],
      projectId: project.id,
      pageId: page.id,
      commitId: page.commitId,
    });
  }

  async deleteSingleLineFromCurrentPage(param: { id: ID }) {
    const [project, page] = await Promise.all([this.apiClient.getCurrentProject(), this.apiClient.getCurrentPage()]);

    return this.changeLines({
      changes: [{ type: 'delete', id: param.id }],
      projectId: project.id,
      pageId: page.id,
      commitId: page.commitId,
    });
  }

  async updateTitle(param: { text: string }) {
    const [project, page] = await Promise.all([this.apiClient.getCurrentProject(), this.apiClient.getCurrentPage()]);
    const titleLine = page.lines[0];

    return this.changeLines({
      changes: [
        { type: 'update', id: titleLine.id, text: param.text },
        { type: 'title', title: param.text },
      ],
      projectId: project.id,
      pageId: page.id,
      commitId: page.commitId,
    });
  }

  async updateDescription(param: { description: string }) {
    const [project, page] = await Promise.all([this.apiClient.getCurrentProject(), this.apiClient.getCurrentPage()]);
    const changes: CommitChangeParam[] = [];

    // page has not description line yet
    if (page.lines.length === 1) {
      changes.push({ type: 'insert', id: generateId(this.userId), text: param.description });
      changes.push({ type: 'insert', id: generateId(this.userId), text: '' });
    } else {
      changes.push({ type: 'update', id: page.lines[1].id, text: param.description });
    }

    changes.push({ type: 'description', text: param.description });

    return this.changeLines({
      changes,
      projectId: project.id,
      pageId: page.id,
      commitId: page.commitId,
    });
  }

  private async changeLines(param: { projectId: string; pageId: string; commitId: string; changes: CommitChangeParam[] }) {
    return this.websocketClient.commit({
      userId: this.userId,
      projectId: param.projectId,
      pageId: param.pageId,
      parentId: param.commitId,
      changes: param.changes,
    });
  }
}

export const getPrivateApi = async () => {
  const apiClient = new ApiClient();
  const [user, project, page] = await Promise.all([apiClient.getMe(), apiClient.getCurrentProject(), apiClient.getCurrentPage()]);
  const websocketClient = new WebsocketClient(user.id);
  await websocketClient.joinRoom({ projectId: project.id, pageId: page.id });

  return new PrivateApi(user.id, apiClient, websocketClient);
};
