import { ID } from '../../../public-api';
import {
  CommitChange,
  createDeletionChange,
  createDescriptionChange,
  createInsertionChange,
  createTitleChange,
  createUpdationChange,
} from './commit-change';

type InsertParam = { type: 'insert'; position?: ID; text: string };
type UpdateParam = { type: 'update'; id: ID; text: string };
type DeleteParam = { type: 'delete'; id: ID };
type TitleParam = { type: 'title'; title: string };
type DescriptionParam = { type: 'description'; text: string };
export type CommitChangeParam = InsertParam | UpdateParam | DeleteParam | TitleParam | DescriptionParam;

/**
 * @param source
 * @param userId - to generate new ID of user
 */
const createChange = (source: CommitChangeParam, userId: ID): CommitChange => {
  if (source.type === 'insert') {
    return createInsertionChange(source, userId);
  } else if (source.type === 'update') {
    return createUpdationChange(source);
  } else if (source.type === 'delete') {
    return createDeletionChange(source);
  } else if (source.type === 'title') {
    return createTitleChange(source);
  } else if (source.type === 'description') {
    return createDescriptionChange(source);
  } else {
    throw new Error('Bad implement');
  }
};

export const createChanges = (params: CommitChangeParam[], userId: ID): CommitChange[] => params.map((p) => createChange(p, userId));
