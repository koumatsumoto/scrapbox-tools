import { generateId, ID } from '../public-api';
import { ApiClient } from './api-client/api-client';
import { CommitChangeParam, WebsocketClient } from './websocket-clinet';

type InsertLineParam = { text: string; position?: ID };
type UpdateLineParam = { id: ID; text: string };
type DeleteLineParam = { id: ID };

export class PrivateApi {
  constructor(private readonly userId: ID, private readonly apiClient: ApiClient, private readonly websocketClient: WebsocketClient) {}

  async insertLine(param: InsertLineParam | InsertLineParam[]) {
    const [project, page] = await Promise.all([this.apiClient.getCurrentProject(), this.apiClient.getCurrentPage()]);
    const array = Array.isArray(param) ? param : [param];

    return this.changeLines({
      changes: array.map((p) => ({ ...p, type: 'insert', id: generateId(this.userId) })),
      projectId: project.id,
      pageId: page.id,
      commitId: page.commitId,
    });
  }

  async updateLine(param: UpdateLineParam | UpdateLineParam[]) {
    const [project, page] = await Promise.all([this.apiClient.getCurrentProject(), this.apiClient.getCurrentPage()]);
    const array = Array.isArray(param) ? param : [param];

    return this.changeLines({
      changes: array.map((p) => ({ ...p, type: 'update' })),
      projectId: project.id,
      pageId: page.id,
      commitId: page.commitId,
    });
  }

  async deleteLine(param: DeleteLineParam | DeleteLineParam[]) {
    const [project, page] = await Promise.all([this.apiClient.getCurrentProject(), this.apiClient.getCurrentPage()]);
    const array = Array.isArray(param) ? param : [param];

    return this.changeLines({
      changes: array.map((p) => ({ ...p, type: 'delete' })),
      projectId: project.id,
      pageId: page.id,
      commitId: page.commitId,
    });
  }

  async updateTitleAndDescription(param: { title: string; description?: string } | { title?: string; description: string }) {
    const [project, page] = await Promise.all([this.apiClient.getCurrentProject(), this.apiClient.getCurrentPage()]);
    const titleLine = page.lines[0];
    const changes: CommitChangeParam[] = [];

    if (typeof param.title === 'string') {
      changes.push({ type: 'update', id: titleLine.id, text: param.title });
      changes.push({ type: 'title', title: param.title });
    }
    if (typeof param.description === 'string') {
      // page has not description line yet
      if (page.lines.length === 1) {
        changes.push({ type: 'insert', id: generateId(this.userId), text: param.description });
        changes.push({ type: 'insert', id: generateId(this.userId), text: '' });
      } else {
        changes.push({ type: 'update', id: page.lines[1].id, text: param.description });
      }
      changes.push({ type: 'description', text: param.description });
    }

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

const preparePrivateApi = async () => {
  const apiClient = new ApiClient();
  const [user, project, page] = await Promise.all([apiClient.getMe(), apiClient.getCurrentProject(), apiClient.getCurrentPage()]);
  const websocketClient = new WebsocketClient(user.id);
  await websocketClient.joinRoom({ projectId: project.id, pageId: page.id });

  return new PrivateApi(user.id, apiClient, websocketClient);
};

let privateApiPreparation: Promise<PrivateApi> | undefined;
export const getPrivateApi = async (option: { newInstance: boolean } = { newInstance: false }) => {
  if (option.newInstance) {
    return preparePrivateApi();
  }

  if (!privateApiPreparation) {
    privateApiPreparation = preparePrivateApi();
  }

  return privateApiPreparation;
};
