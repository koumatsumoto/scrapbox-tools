import { isNode } from './common/env';
import { RestApiClient } from './rest-api-client/rest-api-client';
import { ScrapboxClient } from './scrapbox-client';
import { WebsocketClient } from './websocket-clinet/websocket-client';

// singleton instance
let setupClient: Promise<ScrapboxClient>;

export const getScrapboxClient = async (config: {
  readonly token?: string;
  readonly userId: string;
  readonly projectId: string;
  readonly projectName: string;
}) => {
  if (setupClient) {
    return setupClient;
  }

  if (isNode() && typeof config.token !== 'string') {
    throw new Error('token required if node environment');
  }

  setupClient = new Promise<ScrapboxClient>((resolve, reject) => {
    const client = new ScrapboxClient(config.userId, config.projectId, config.projectName, new RestApiClient(config.token), new WebsocketClient(config.token));
    // TODO: check authority
    resolve(client);
  });

  return setupClient;
};
