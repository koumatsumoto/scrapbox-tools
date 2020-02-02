import { ExternalCommitResponse, ExternalResponse } from '../websocket-client-types';

const isExternalCommitResponse = (response: ExternalResponse): response is ExternalCommitResponse => response[0] === 'commit';
export const tryRetrieveCommitData = (response: ExternalResponse) => {
  return isExternalCommitResponse(response) ? response[1] : null;
};
