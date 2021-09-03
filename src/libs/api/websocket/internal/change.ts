import { createIdGenerator } from '../../common';

// raw data for scrapbox api
type InsertChange = { _insert: string | '_end'; lines: { id: string; text: string } };
type UpdateChange = { _update: string; lines: { text: string } };
type DeleteChange = { _delete: string; lines: -1 };
type TitleChange = { title: string };
type DescriptionChange = { descriptions: [string] };
export type CommitChange = InsertChange | UpdateChange | DeleteChange | TitleChange | DescriptionChange;

// interface for human readable
export type ChangeRequest =
  | { type: 'insert'; text: string; position?: string }
  | { type: 'update'; id: string; text: string }
  | { type: 'delete'; id: string }
  | { type: 'title'; title: string }
  | { type: 'description'; text: string };

export const createChanges = (values: ChangeRequest[], userId: string) => {
  const generateId = createIdGenerator(userId);

  return values.map((param) => {
    switch (param.type) {
      case 'insert': {
        return { _insert: param.position || '_end', lines: { id: generateId(), text: param.text } };
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
};
