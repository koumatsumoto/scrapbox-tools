import { ID } from '../../../public-api';

export type InsertCommitChange = {
  // point to insert, all after here go down one line.
  // use '_end' value if insert to last line.
  _insert: ID | '_end';
  lines: {
    id: ID;
    text: string;
  };
};

export type UpdateCommitChange = {
  // target line id
  _update: ID;
  lines: {
    text: string;
  };
};

export type DeleteCommitChange = {
  _delete: ID;
  lines: -1;
};

export type TitleCommitChange = { title: string };

export type DescriptionsCommitChange = { descriptions: string[] };

export type CommitChange = InsertCommitChange | UpdateCommitChange | DeleteCommitChange | TitleCommitChange | DescriptionsCommitChange;

export const createInsertionChange = (param: { id: ID; position?: ID; text: string }): InsertCommitChange => {
  return {
    _insert: param.position || '_end',
    lines: {
      id: param.id,
      text: param.text,
    },
  };
};

export const createUpdationChange = (param: { id: ID; text: string }): UpdateCommitChange => {
  return {
    _update: param.id,
    lines: {
      text: param.text,
    },
  };
};

export const createDeletionChange = (param: { id: ID }): DeleteCommitChange => {
  return {
    _delete: param.id,
    lines: -1,
  };
};

export const createTitleChange = (param: { title: string }): TitleCommitChange => {
  return {
    title: param.title,
  };
};

export const createDescriptionChange = (param: { text: string }): DescriptionsCommitChange => {
  return { descriptions: [param.text] };
};
