import { ApiClient } from './api-client';
import { WebsocketClient } from './websocket-client';

export class PrivateApi {
  constructor(private readonly apiClient: ApiClient, private readonly websocketClient: WebsocketClient) {}
}

export const getPrivateApi = async () => {
  const apiClient = new ApiClient();
  const [page, project] = await Promise.all([apiClient.getCurrentPage(), apiClient.getCurrentProject()]);
  const websocketClient = new WebsocketClient({ projectId: project.id });

  return new PrivateApi(apiClient, websocketClient);
};
