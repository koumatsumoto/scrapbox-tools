import { getRx } from '../../common/rxjs';
import { generateId, getCurrentPageName, ID, onPageChange } from '../public-api';
import { ApiClient } from './api-client/api-client';
import { PageResponse } from './api-client/api-client-types';
import { CommitChangeParam, WebsocketClient } from './websocket-clinet';

type InsertLineParam = { text: string; position?: ID };
type UpdateLineParam = { id: ID; text: string };
type DeleteLineParam = { id: ID };

export class PrivateApi {
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
    this.pageResponse$.subscribe();
    onPageChange((t) => this.pageRequest$.next(t));
  }

  getPageData(): Promise<PageResponse | null> {
    return this.pageResponse$.pipe(getRx().operators.first()).toPromise();
  }

  /**
   * call after construction
   */
  async initialize() {
    const title = getCurrentPageName();
    this.pageRequest$.next(title);

    // wait for initial page data fetching (handling is registered in constructor)
    await this.getPageData();
  }

  async insertLine(param: InsertLineParam | InsertLineParam[]) {
    const page = await this.getPageData();
    if (page === null) {
      throw new Error('Page is not found');
    }

    const array = Array.isArray(param) ? param : [param];

    return this.changeLines({
      changes: array.map((p) => ({ ...p, type: 'insert', id: generateId(this.userId) })),
      projectId: this.projectId,
      pageId: page.id,
      commitId: page.commitId,
    });
  }

  async updateLine(param: UpdateLineParam | UpdateLineParam[]) {
    const page = await this.getPageData();
    if (page === null) {
      throw new Error('Page is not found');
    }

    const array = Array.isArray(param) ? param : [param];

    return this.changeLines({
      changes: array.map((p) => ({ ...p, type: 'update' })),
      projectId: this.projectId,
      pageId: page.id,
      commitId: page.commitId,
    });
  }

  async deleteLine(param: DeleteLineParam | DeleteLineParam[]) {
    const page = await this.getPageData();
    if (page === null) {
      throw new Error('Page is not found');
    }
    const array = Array.isArray(param) ? param : [param];

    return this.changeLines({
      changes: array.map((p) => ({ ...p, type: 'delete' })),
      projectId: this.projectId,
      pageId: page.id,
      commitId: page.commitId,
    });
  }

  async updateTitleAndDescription(param: { title: string; description?: string } | { title?: string; description: string }) {
    const page = await this.getPageData();
    if (page === null) {
      throw new Error('Page is not found');
    }

    const titleLine = page.lines[0];
    const changes: CommitChangeParam[] = [];

    if (typeof param.title === 'string') {
      changes.push({ type: 'update', id: titleLine.id, text: param.title });
      changes.push({ type: 'title', title: param.title });
    }
    if (typeof param.description === 'string') {
      // page has not description line yet
      if (page.lines.length === 1) {
        changes.push({ type: 'insert', id: generateId(this.userId), text: param.description });
        changes.push({ type: 'insert', id: generateId(this.userId), text: '' });
      } else {
        changes.push({ type: 'update', id: page.lines[1].id, text: param.description });
      }
      changes.push({ type: 'description', text: param.description });
    }

    return this.changeLines({
      changes,
      projectId: this.projectId,
      pageId: page.id,
      commitId: page.commitId,
    });
  }

  private async changeLines(param: { projectId: string; pageId: string; commitId: string; changes: CommitChangeParam[] }) {
    return this.websocketClient.commit({
      userId: this.userId,
      projectId: param.projectId,
      pageId: param.pageId,
      parentId: param.commitId,
      changes: param.changes,
    });
  }
}

const preparePrivateApi = async () => {
  console.log('[private-api] start preparation');
  const apiClient = new ApiClient();
  const [user, project] = await Promise.all([apiClient.getMe(), apiClient.getCurrentProject()]);
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
