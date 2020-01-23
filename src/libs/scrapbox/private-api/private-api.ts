import { ID } from '../public-api';
import { ApiClient } from './api-client/api-client';
import { WebsocketClient } from './websocket-clinet/websocket-client';
import { createDeletionChange, createInsertionChange, createUpdationChange } from './websocket-clinet/websocket-client-internal-functions';

type InsertChange = { type: 'insert'; position?: ID; text: string };
type UpdateChange = { type: 'update'; id: ID; text: string };
type DeleteChange = { type: 'delete'; id: ID };
type Change = InsertChange | UpdateChange | DeleteChange;
type InsertChangeWithUserId = InsertChange & { userId: ID };
type ChangeParam = InsertChangeWithUserId | UpdateChange | DeleteChange;

const createChanges = (params: ChangeParam[]) => {
  return params.map((p) => {
    if (p.type === 'insert') {
      return createInsertionChange(p);
    } else if (p.type === 'update') {
      return createUpdationChange(p);
    } else {
      return createDeletionChange(p);
    }
  });
};

export class PrivateApi {
  constructor(private readonly userId: ID, private readonly apiClient: ApiClient, private readonly websocketClient: WebsocketClient) {}

  async changeLines(param: { projectId: string; pageId: string; commitId: string; changes: Change[] }) {
    return this.websocketClient.commit({
      userId: this.userId,
      projectId: param.projectId,
      pageId: param.pageId,
      parentId: param.commitId,
      changes: createChanges(
        param.changes.map<ChangeParam>((c) => (c.type === 'insert' ? { ...c, userId: this.userId } : c)),
      ),
    });
  }

  async insertSingleLineIntoCurrentPage(param: { position?: ID; text: string }) {
    const [project, page] = await Promise.all([this.apiClient.getCurrentProject(), this.apiClient.getCurrentPage()]);

    return this.changeLines({
      changes: [{ ...param, type: 'insert' } as const],
      projectId: project.id,
      pageId: page.id,
      commitId: page.commitId,
    });
  }

  async updateSingleLineOfCurrentPage(param: { id: ID; text: string }) {
    const [project, page] = await Promise.all([this.apiClient.getCurrentProject(), this.apiClient.getCurrentPage()]);

    return this.changeLines({
      changes: [{ ...param, type: 'update' }],
      projectId: project.id,
      pageId: page.id,
      commitId: page.commitId,
    });
  }

  async deleteSingleLineFromCurrentPage(param: { id: ID }) {
    const [project, page] = await Promise.all([this.apiClient.getCurrentProject(), this.apiClient.getCurrentPage()]);

    return this.changeLines({
      changes: [{ ...param, type: 'delete' }],
      projectId: project.id,
      pageId: page.id,
      commitId: page.commitId,
    });
  }
}

export const getPrivateApi = async () => {
  const apiClient = new ApiClient();
  const [user, project, page] = await Promise.all([apiClient.getMe(), apiClient.getCurrentProject(), apiClient.getCurrentPage()]);
  const websocketClient = new WebsocketClient();
  await websocketClient.joinRoom({ projectId: project.id, pageId: page.id });

  return new PrivateApi(user.id, apiClient, websocketClient);
};
