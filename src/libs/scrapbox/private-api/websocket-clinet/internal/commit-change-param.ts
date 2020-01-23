import { ID } from '../../../public-api';
import {
  CommitChange,
  createDeletionChange,
  createDescriptionChange,
  createInsertionChange,
  createTitleChange,
  createUpdationChange,
} from './commit-change';

type InsertParam = { type: 'insert'; id: ID; position?: ID; text: string };
type UpdateParam = { type: 'update'; id: ID; text: string };
type DeleteParam = { type: 'delete'; id: ID };
type TitleParam = { type: 'title'; title: string };
type DescriptionParam = { type: 'description'; text: string };
export type CommitChangeParam = InsertParam | UpdateParam | DeleteParam | TitleParam | DescriptionParam;

const createChange = (param: CommitChangeParam): CommitChange => {
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

export const createChanges = (params: CommitChangeParam[]): CommitChange[] => params.map(createChange);
