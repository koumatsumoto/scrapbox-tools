import { generateId } from '../../common';

type InsertChange = { _insert: string | '_end'; lines: { id: string; text: string } };
type UpdateChange = { _update: string; lines: { text: string } };
type DeleteChange = { _delete: string; lines: -1 };
type TitleChange = { title: string };
type DescriptionChange = { descriptions: [string] };
export type CommitChange = InsertChange | UpdateChange | DeleteChange | TitleChange | DescriptionChange;

type InsertChangeRequestParams = { type: 'insert'; text: string; position?: string };
type UpdateChangeRequestParams = { type: 'update'; id: string; text: string };
type DeleteChangeRequestParams = { type: 'delete'; id: string };
type TitleChangeRequestParams = { type: 'title'; title: string };
type DescriptionChangeRequestParams = { type: 'description'; text: string };
export type ChangeRequestCreateParams =
  | InsertChangeRequestParams
  | UpdateChangeRequestParams
  | DeleteChangeRequestParams
  | TitleChangeRequestParams
  | DescriptionChangeRequestParams;

// NOTE: userId is used to generate new ID
export const createChanges = (params: ChangeRequestCreateParams[], userId: string) =>
  params.map((param) => {
    switch (param.type) {
      case 'insert': {
        return { _insert: param.position || '_end', lines: { id: generateId(userId), text: param.text } };
      }
      case 'update': {
        return { _update: param.id, lines: { text: param.text } };
      }
      case 'delete': {
        return { _delete: param.id, lines: -1 };
      }
      case 'title': {
        return { title: param.title };
      }
      case 'description': {
        return { descriptions: [param.text] };
      }
      default: {
        throw new Error('Bad implement');
      }
    }
  });
