import { generateId } from '../../common';

const createInsertChangeRequest = (param: { text: string; position?: string; userId: string }) =>
  ({ _insert: param.position || '_end', lines: { id: generateId(param.userId), text: param.text } } as const);
const createUpdateChangeRequest = (param: { id: string; text: string }) => ({ _update: param.id, lines: { text: param.text } } as const);
const createDeleteChangeRequest = (param: { id: string }) => ({ _delete: param.id, lines: -1 } as const);
const createTitleChangeRequest = (param: { title: string }) => ({ title: param.title } as const);
const createDescriptionChangeRequest = (param: { text: string }) => ({ descriptions: [param.text] } as const);

type InsertChangeRequest = ReturnType<typeof createInsertChangeRequest>;
type UpdateChangeRequest = ReturnType<typeof createUpdateChangeRequest>;
type DeleteChangeRequest = ReturnType<typeof createDeleteChangeRequest>;
type TitleChangeRequest = ReturnType<typeof createTitleChangeRequest>;
type DescriptionChangeRequest = ReturnType<typeof createDescriptionChangeRequest>;
export type CommitChangeRequest = InsertChangeRequest | UpdateChangeRequest | DeleteChangeRequest | TitleChangeRequest | DescriptionChangeRequest;

type InsertChangeRequestCreateParam = { type: 'insert'; text: string; position?: string; userId: string };
type UpdateChangeRequestCreateParam = { type: 'update'; id: string; text: string };
type DeleteChangeRequestCreateParam = { type: 'delete'; id: string };
type TitleChangeRequestCreateParam = { type: 'title'; title: string };
type DescriptionChangeRequestCreateParam = { type: 'description'; text: string };
export type ChangeRequestCreateParams =
  | InsertChangeRequestCreateParam
  | UpdateChangeRequestCreateParam
  | DeleteChangeRequestCreateParam
  | TitleChangeRequestCreateParam
  | DescriptionChangeRequestCreateParam;

// NOTE: userId is used to generate new ID
export const createChangeRequests = (params: ChangeRequestCreateParams[], userId: string) =>
  params.map((p) => {
    switch (p.type) {
      case 'insert': {
        return createInsertChangeRequest({ ...p, userId });
      }
      case 'update': {
        return createUpdateChangeRequest(p);
      }
      case 'delete': {
        return createDeleteChangeRequest(p);
      }
      case 'title': {
        return createTitleChangeRequest(p);
      }
      case 'description': {
        return createDescriptionChangeRequest(p);
      }
      default: {
        throw new Error('Bad implement');
      }
    }
  });
