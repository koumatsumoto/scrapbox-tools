import { isNode } from './common/env';
import { RestApiClient } from './rest-api-client/rest-api-client';
import { ScrapboxClient } from './scrapbox-client';
import { WebsocketClient } from './websocket-clinet/websocket-client';

// singleton instance
let globalClient: Promise<ScrapboxClient>;

export const getScrapboxClient = async (config: { readonly token?: string; readonly projectName: string }) => {
  if (globalClient) {
    return globalClient;
  }

  // NOTE: in browser, cookie is used automatically
  if (isNode() && typeof config.token !== 'string') {
    throw new Error('token required if node environment');
  }

  const apiClient = new RestApiClient(config.token);
  const [user, project] = await Promise.all([apiClient.getMe(), apiClient.getProject(config.projectName)]);
  if (user.id == '') {
    throw new Error('token maybe unauthorized');
  }
  if (project.id == '') {
    throw new Error('project name maybe incorrect');
  }

  globalClient = new Promise<ScrapboxClient>((resolve) => {
    resolve(new ScrapboxClient(user.id, project.id, config.projectName, new RestApiClient(config.token), new WebsocketClient(config.token)));
  });

  return globalClient;
};
