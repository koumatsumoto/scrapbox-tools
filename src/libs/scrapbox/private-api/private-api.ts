import { getRx } from '../../common/rxjs';
import { getCurrentPageName, ID } from '../public-api';
import { onPageChange } from '../router';
import { ApiClient } from './api-client/api-client';
import { MeResponse, PageResponse } from './api-client/api-client-types';
import { CommitChangeParam, WebsocketClient } from './websocket-clinet';

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

  constructor(
    private readonly userId: ID,
    private readonly projectId: string,
    private readonly apiClient: ApiClient,
    private readonly websocketClient: WebsocketClient,
  ) {
    // register page change handling
    this.pageResponse$.subscribe((page) => {
      this.pageData = page;
      this.websocketClient.joinRoom({ projectId: this.projectId, pageId: page === null ? null : page.id });
    });
    // handle update by other user
    this.websocketClient.commitIdUpdate$.subscribe((data) => {
      if (this.pageData && this.pageData.id === data.pageId) {
        this.pageData.commitId = data.id;
      }
    });
    onPageChange((t) => this.pageRequest$.next(t));
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

    // update last commit id
    if (this.pageData) {
      this.pageData.commitId = response[0].data.commitId;
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
  const websocketClient = new WebsocketClient(user!.id);

  const api = new PrivateApi(user.id, project.id, apiClient, websocketClient);
  await api.initialize();

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
