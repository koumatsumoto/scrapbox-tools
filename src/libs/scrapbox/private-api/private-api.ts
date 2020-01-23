import { ID } from '../public-api';
import { ApiClient } from './api-client/api-client';
import {
  CommitChange,
  createDeletionChange,
  createDescriptionChange,
  createInsertionChange,
  createTitleChange,
  createUpdationChange,
} from './websocket-clinet/internal/commit-change';
import { WebsocketClient } from './websocket-clinet/websocket-client';

type InsertChangeParam = { type: 'insert'; position?: ID; text: string };
type UpdateChangeParam = { type: 'update'; id: ID; text: string };
type DeleteChangeParam = { type: 'delete'; id: ID };
type TitleChangeParam = { type: 'title'; text: string };
type DescriptionChangeParam = { type: 'description'; text: string };
type ChangeParamExceptInsert = UpdateChangeParam | DeleteChangeParam | TitleChangeParam | DescriptionChangeParam;
type ChangeLinesParam = InsertChangeParam | ChangeParamExceptInsert;
type InsertChangeWithUserId = InsertChangeParam & { userId: ID };
type ChangeParam = InsertChangeWithUserId | ChangeParamExceptInsert;

export const createChange = (param: ChangeParam): CommitChange => {
  if (param.type === 'insert') {
    return createInsertionChange(param);
  } else if (param.type === 'update') {
    return createUpdationChange(param);
  } else if (param.type === 'delete') {
    return createDeletionChange(param);
  } else if (param.type === 'title') {
    return createTitleChange(param);
  } else {
    return createDescriptionChange(param);
  }
};

export const createChanges = (params: ChangeParam[]): CommitChange[] => params.map(createChange);

export class PrivateApi {
  constructor(private readonly userId: ID, private readonly apiClient: ApiClient, private readonly websocketClient: WebsocketClient) {}

  async changeLines(param: { projectId: string; pageId: string; commitId: string; changes: ChangeLinesParam[] }) {
    return this.websocketClient.commit({
      userId: this.userId,
      projectId: param.projectId,
      pageId: param.pageId,
      parentId: param.commitId,
      changes: createChanges(
        param.changes.map<ChangeParam>((c) => (c.type === 'insert' ? { ...c, userId: this.userId } : c)),
      ),
    });
  }

  async insertSingleLineIntoCurrentPage(param: { position?: ID; text: string }) {
    const [project, page] = await Promise.all([this.apiClient.getCurrentProject(), this.apiClient.getCurrentPage()]);

    return this.changeLines({
      changes: [{ ...param, type: 'insert' } as const],
      projectId: project.id,
      pageId: page.id,
      commitId: page.commitId,
    });
  }

  async updateSingleLineOfCurrentPage(param: { id: ID; text: string }) {
    const [project, page] = await Promise.all([this.apiClient.getCurrentProject(), this.apiClient.getCurrentPage()]);

    return this.changeLines({
      changes: [{ ...param, type: 'update' }],
      projectId: project.id,
      pageId: page.id,
      commitId: page.commitId,
    });
  }

  async deleteSingleLineFromCurrentPage(param: { id: ID }) {
    const [project, page] = await Promise.all([this.apiClient.getCurrentProject(), this.apiClient.getCurrentPage()]);

    return this.changeLines({
      changes: [{ ...param, type: 'delete' }],
      projectId: project.id,
      pageId: page.id,
      commitId: page.commitId,
    });
  }

  async updateTitle(param: { text: string }) {
    const [project, page] = await Promise.all([this.apiClient.getCurrentProject(), this.apiClient.getCurrentPage()]);
    const titleLine = page.lines[0];

    return this.changeLines({
      changes: [
        { id: titleLine.id, text: param.text, type: 'update' },
        { text: param.text, type: 'title' },
      ],
      projectId: project.id,
      pageId: page.id,
      commitId: page.commitId,
    });
  }

  async updateDescription(param: { description: string }) {
    const [project, page] = await Promise.all([this.apiClient.getCurrentProject(), this.apiClient.getCurrentPage()]);
    const changes: ChangeLinesParam[] = [];

    // page has not description line yet
    if (page.lines.length === 1) {
      changes.push({ text: param.description, type: 'insert' });
      changes.push({ text: '', type: 'insert' });
    } else {
      changes.push({ type: 'update', id: page.lines[1].id, text: param.description });
    }

    changes.push({ type: 'description', text: param.description });

    return this.changeLines({
      changes,
      projectId: project.id,
      pageId: page.id,
      commitId: page.commitId,
    });
  }
}

export const getPrivateApi = async () => {
  const apiClient = new ApiClient();
  const [user, project, page] = await Promise.all([apiClient.getMe(), apiClient.getCurrentProject(), apiClient.getCurrentPage()]);
  const websocketClient = new WebsocketClient();
  await websocketClient.joinRoom({ projectId: project.id, pageId: page.id });

  return new PrivateApi(user.id, apiClient, websocketClient);
};
