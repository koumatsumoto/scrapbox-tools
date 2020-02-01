import { getRx } from '../../common/rxjs';
import { generateId, getCurrentPageName, ID, onPageChange } from '../public-api';
import { ApiClient } from './api-client/api-client';
import { CommitChangeParam, WebsocketClient } from './websocket-clinet';

type InsertLineParam = { text: string; position?: ID };
type UpdateLineParam = { id: ID; text: string };
type DeleteLineParam = { id: ID };

export class PrivateApi {
  private currentPageTitle: string | null = null;
  private currentPageId: string | null = null;
  private currentPageCommitId: string | null = null;
  private pageData: {
    id: string;
    title: string;
    commitId: string;
  } | null = null;
  private readonly pageRequest$ = new (getRx().Subject)<string | null>();
  private readonly pageResponse$ = this.pageRequest$.pipe(
    getRx().operators.switchMap((title) => (title === null ? getRx().of(null) : this.apiClient.getPage(title))),
  );

  constructor(
    private readonly userId: ID,
    private readonly projectId: string,
    private readonly apiClient: ApiClient,
    private readonly websocketClient: WebsocketClient,
  ) {
    this.registerPageChangeHandling();
  }

  /**
   * call after construction
   */
  async initialize() {
    const title = getCurrentPageName();
    this.pageRequest$.next(title);
  }

  async insertLine(param: InsertLineParam | InsertLineParam[]) {
    this.checkPage();
    const array = Array.isArray(param) ? param : [param];

    return this.changeLines({
      changes: array.map((p) => ({ ...p, type: 'insert', id: generateId(this.userId) })),
      projectId: this.projectId,
      pageId: this.currentPageId!,
      commitId: this.currentPageCommitId!,
    });
  }

  async updateLine(param: UpdateLineParam | UpdateLineParam[]) {
    this.checkPage();
    const array = Array.isArray(param) ? param : [param];

    return this.changeLines({
      changes: array.map((p) => ({ ...p, type: 'update' })),
      projectId: this.projectId,
      pageId: this.currentPageId!,
      commitId: this.currentPageCommitId!,
    });
  }

  async deleteLine(param: DeleteLineParam | DeleteLineParam[]) {
    this.checkPage();
    const array = Array.isArray(param) ? param : [param];

    return this.changeLines({
      changes: array.map((p) => ({ ...p, type: 'delete' })),
      projectId: this.projectId,
      pageId: this.currentPageId!,
      commitId: this.currentPageCommitId!,
    });
  }

  async updateTitleAndDescription(param: { title: string; description?: string } | { title?: string; description: string }) {
    const page = await this.apiClient.getCurrentPage();
    if (!page) {
      throw new Error('Use in layout:page');
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

  private registerPageChangeHandling() {
    onPageChange((t) => this.pageRequest$.next(t));
    this.pageResponse$.subscribe((pageOrNull) => (this.pageData = pageOrNull));
  }

  private async handlePageChange(title: string | null) {
    // layout:list
    if (title === null) {
      this.currentPageTitle = null;
      this.currentPageId = null;
    } else {
      const page = await this.apiClient.getPage(title);
      this.currentPageTitle = page.title;
      this.currentPageId = page.id;
      this.currentPageCommitId = page.commitId;
    }

    this.websocketClient.joinRoom({ projectId: this.projectId, pageId: this.currentPageId });
  }

  private checkPage() {
    if (!this.currentPageId || !this.currentPageCommitId) {
      throw new Error('page id or commit id is not set');
    }

    // when page information is overridden by multiple xhr
    if (this.currentPageTitle && this.currentPageTitle !== getCurrentPageName()) {
      throw new Error('invalid state');
    }
  }
}

const preparePrivateApi = async () => {
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
