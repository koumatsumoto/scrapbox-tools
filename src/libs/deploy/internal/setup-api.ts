import { ApiClient } from '../../api-client';
import { RestApiClient } from '../../api-client/rest-api-client/rest-api-client';
import { WebsocketClient } from '../../api-client/websocket-clinet/websocket-client';

export const getGlobalScrapboxApiFn = () => {
  let api: ApiClient | null = null;

  return async (projectName: string, token?: string) => {
    if (api) {
      return api;
    }

    const restApi = new RestApiClient(token);
    const websocket = new WebsocketClient(token);
    const [user, project] = await Promise.all([restApi.getMe(), restApi.getProject(projectName)]);

    // failed to login
    if (user.isGuest) {
      throw new Error('Authentication Error, cookie may not be set');
    }
    // for debug purpose
    (globalThis as any).api = restApi;

    return (api = new ApiClient(user.id, project.id, project.name, restApi, websocket));
  };
};

// singleton
export const getGlobalScrapboxApi = getGlobalScrapboxApiFn();
