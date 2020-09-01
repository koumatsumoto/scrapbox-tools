import { generateId, ID } from '../../common';

const createInsertChangeRequest = (param: { text: string; position?: ID; userId: ID }) =>
  ({ _insert: param.position || '_end', lines: { id: generateId(param.userId), text: param.text } } as const);
const createUpdateChangeRequest = (param: { id: ID; text: string }) => ({ _update: param.id, lines: { text: param.text } } as const);
const createDeleteChangeRequest = (param: { id: ID }) => ({ _delete: param.id, lines: -1 } as const);
const createTitleChangeRequest = (param: { title: string }) => ({ title: param.title } as const);
const createDescriptionChangeRequest = (param: { text: string }) => ({ descriptions: [param.text] } as const);

export type CommitChangeRequest =
  | ReturnType<typeof createInsertChangeRequest>
  | ReturnType<typeof createUpdateChangeRequest>
  | ReturnType<typeof createDeleteChangeRequest>
  | ReturnType<typeof createTitleChangeRequest>
  | ReturnType<typeof createDescriptionChangeRequest>;

export type ChangeRequestParams =
  | ({ type: 'insert' } & Parameters<typeof createInsertChangeRequest>[0])
  | ({ type: 'update' } & Parameters<typeof createUpdateChangeRequest>[0])
  | ({ type: 'delete' } & Parameters<typeof createDeleteChangeRequest>[0])
  | ({ type: 'title' } & Parameters<typeof createTitleChangeRequest>[0])
  | ({ type: 'description' } & Parameters<typeof createDescriptionChangeRequest>[0]);

// NOTE: userId is used to generate new ID
export const createChangeRequests = (params: ChangeRequestParams[], userId: ID) =>
  params.map((p) => {
    if (p.type === 'insert') {
      return createInsertChangeRequest({ ...p, userId });
    } else if (p.type === 'update') {
      return createUpdateChangeRequest(p);
    } else if (p.type === 'delete') {
      return createDeleteChangeRequest(p);
    } else if (p.type === 'title') {
      return createTitleChangeRequest(p);
    } else if (p.type === 'description') {
      return createDescriptionChangeRequest(p);
    } else {
      throw new Error('Bad implement');
    }
  });
