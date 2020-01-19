import { ID } from '../public-api';
import { ApiClient } from './api-client/api-client';
import { WebsocketClient } from './websocket-clinet/websocket-client';
import { createDeletionChange, createInsertionChange, createUpdationChange } from './websocket-clinet/websocket-client-internal-functions';

export class PrivateApi {
  constructor(private readonly userId: ID, private readonly apiClient: ApiClient, private readonly websocketClient: WebsocketClient) {}

  async insertSingleLine(param: { projectId: string; pageId: string; commitId: string; position?: ID; text: string }) {
    return this.websocketClient.commit({
      userId: this.userId,
      projectId: param.projectId,
      pageId: param.pageId,
      parentId: param.commitId,
      changes: [
        createInsertionChange({
          userId: this.userId,
          position: param.position || '_end',
          text: param.text,
        }),
      ],
    });
  }

  async updateSingleLine(param: { projectId: string; pageId: string; commitId: string; lineId: ID; text: string }) {
    return this.websocketClient.commit({
      userId: this.userId,
      projectId: param.projectId,
      pageId: param.pageId,
      parentId: param.commitId,
      changes: [
        createUpdationChange({
          id: param.lineId,
          text: param.text,
        }),
      ],
    });
  }

  async deleteSingleLine(param: { projectId: string; pageId: string; commitId: string; lineId: ID }) {
    return this.websocketClient.commit({
      userId: this.userId,
      projectId: param.projectId,
      pageId: param.pageId,
      parentId: param.commitId,
      changes: [
        createDeletionChange({
          id: param.lineId,
        }),
      ],
    });
  }

  async insertSingleLineIntoCurrentPage(param: { position?: ID; text: string }) {
    const [project, page] = await Promise.all([this.apiClient.getCurrentProject(), this.apiClient.getCurrentPage()]);

    return this.insertSingleLine({
      ...param,
      projectId: project.id,
      pageId: page.id,
      commitId: page.commitId,
    });
  }

  async updateSingleLineOfCurrentPage(param: { lineId: ID; text: string }) {
    const [project, page] = await Promise.all([this.apiClient.getCurrentProject(), this.apiClient.getCurrentPage()]);

    return this.updateSingleLine({
      ...param,
      projectId: project.id,
      pageId: page.id,
      commitId: page.commitId,
    });
  }

  async deleteSingleLineFromCurrentPage(param: { lineId: ID }) {
    const [project, page] = await Promise.all([this.apiClient.getCurrentProject(), this.apiClient.getCurrentPage()]);

    return this.deleteSingleLine({
      ...param,
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
