import { getRx } from '../../common/rxjs';
import { getCurrentPageName, ID } from '../public-api';
import { Router } from '../router';
import { ApiClient } from './api-client/api-client';
import { MeResponse, PageResponse } from './api-client/api-client-types';
import { CommitChangeParam } from './websocket-clinet';
import { isCommitSuccessResponsePayload } from './websocket-clinet/internal/response';
import { WebsocketClient } from './websocket-clinet/websocket-client';

interface PageData extends PageResponse {
  // will mutate
  commitId: string;
}

export class PrivateApi {
  requestStatus$ = new (getRx().Subject)<'request start' | 'request end'>();

  private pageData: PageData | null = null;
  private readonly pageRequest$ = new (getRx().Subject)<string | null>();
  private readonly pageResponse$ = this.pageRequest$.pipe(
    getRx().operators.distinctUntilChanged(),
    getRx().operators.switchMap((title) => (title === null ? getRx().of(null) : this.apiClient.getPage(title))),
    getRx().operators.shareReplay(1),
  );
  private websocketClient!: WebsocketClient;

  constructor(private readonly userId: ID, private readonly projectId: string, private readonly apiClient: ApiClient) {
    this.websocketClient = new WebsocketClient();

    // handle update by other user
    this.websocketClient.onCommitIdUpdated((data) => {
      if (this.pageData && this.pageData.id === data.pageId) {
        this.pageData.commitId = data.commitId;
      }
    });

    // register page change handling
    this.pageResponse$.subscribe((page) => {
      this.pageData = page;
      if (page) {
        this.websocketClient.disjoinRoom();
        this.websocketClient.joinRoom({ projectId: this.projectId, pageId: page.id });
      } else {
        this.websocketClient.disjoinRoom();
      }
    });
    Router.onPageChange((t) => this.pageRequest$.next(t));
  }

  /**
   * call after construction
   */
  async initialize() {
    const title = getCurrentPageName();
    this.pageRequest$.next(title);
    // wait for initial page data fetching (handling is registered in constructor)
    await this.pageResponse$.pipe(getRx().operators.first()).toPromise();
  }

  async changeLine(param: CommitChangeParam | CommitChangeParam[]) {
    if (!this.pageData) {
      throw new Error('Page data is not set');
    }

    return this.commit({
      changes: Array.isArray(param) ? param : [param],
      projectId: this.projectId,
      pageId: this.pageData.id,
      commitId: this.pageData.commitId,
    });
  }

  private async commit(param: { projectId: string; pageId: string; commitId: string; changes: CommitChangeParam[] }) {
    this.requestStatus$.next('request start');

    const response = await this.websocketClient.commit({
      userId: this.userId,
      projectId: param.projectId,
      pageId: param.pageId,
      parentId: param.commitId,
      changes: param.changes,
    });

    if (isCommitSuccessResponsePayload(response[0])) {
      // update last commit id
      if (this.pageData) {
        this.pageData.commitId = response[0].data.commitId;
      }
    }

    this.requestStatus$.next('request end');

    return response;
  }
}

// to cache
let fetchingMe: Promise<MeResponse>;
export const getMe = () => {
  if (fetchingMe) {
    return fetchingMe;
  }

  const apiClient = new ApiClient();
  fetchingMe = apiClient.getMe();

  return fetchingMe;
};

const preparePrivateApi = async () => {
  console.log('[private-api] start preparation');
  const apiClient = new ApiClient();
  const [user, project] = await Promise.all([getMe(), apiClient.getCurrentProject()]);

  const api = new PrivateApi(user.id, project.id, apiClient);
  await api.initialize();
  // for debug purpose
  (window as any).api = api;

  return api;
};

let privateApiPreparation: Promise<PrivateApi> | undefined;
export const getPrivateApi = (option: { newInstance: boolean } = { newInstance: false }) => {
  if (option.newInstance) {
    return preparePrivateApi();
  }

  if (!privateApiPreparation) {
    privateApiPreparation = preparePrivateApi();
  }

  return privateApiPreparation as Promise<PrivateApi>;
};
