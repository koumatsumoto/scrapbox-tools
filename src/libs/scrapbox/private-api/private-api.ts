import { ApiClient } from './api-client';
import { WebsocketClient } from './websocket-client';
import { createUpdateSingleLineChange } from './websocket-client-internal-functions';

export class PrivateApi {
  constructor(private readonly apiClient: ApiClient, private readonly websocketClient: WebsocketClient) {}

  async updateSingleLineOfThisPage(param: { lineId: string; text: string }) {
    const [page, project, user] = await Promise.all([
      this.apiClient.getCurrentPage(),
      this.apiClient.getCurrentProject(),
      this.apiClient.getMe(),
    ]);

    this.websocketClient.commit({
      userId: user.id,
      projectId: project.id,
      pageId: page.id,
      parentId: page.commitId,
      changes: [
        createUpdateSingleLineChange({
          id: param.lineId,
          text: param.text,
        }),
      ],
    });
  }
}

export const getPrivateApi = async () => {
  const apiClient = new ApiClient();
  const [page, project] = await Promise.all([apiClient.getCurrentPage(), apiClient.getCurrentProject()]);
  const websocketClient = new WebsocketClient();
  websocketClient.joinRoom({ projectId: project.id, pageId: page.id });

  return new PrivateApi(apiClient, websocketClient);
};
