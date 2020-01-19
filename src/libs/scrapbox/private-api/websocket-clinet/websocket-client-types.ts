// only actually used values
import { ID } from '../../public-api';

/**
 * - '0'
 * - '2'
 * - '3'
 * - '40'
 * - '42x'
 */
export type Protocol = '0' | '2' | '3' | '40' | '42' | string;

export type ConnectionOpenMessage = {
  sid: string;
  upgrades: [];
  pingInterval: number;
  pingTimeout: number;
};
export type ConnectionResultReceiveMessage = [{ data: { success: boolean; pageId: null; projectId: string } }];
export type ReceivedMessage = ConnectionOpenMessage | ConnectionResultReceiveMessage | null;

export type ProtocolAndPayload = ['0', ConnectionOpenMessage] | [Protocol, ReceivedMessage];

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

export type CommitChange = InsertCommitChange | UpdateCommitChange | DeleteCommitChange;

export type CommitPayload = {
  method: 'commit';
  data: {
    kind: 'page';
    // last committed id
    parentId: string;
    changes: CommitChange[];
    cursor: null;
    pageId: string;
    userId: ID;
    projectId: string;
    freeze: true;
  };
};

type JoinRoomPayload = {
  method: 'room:join';
  data: {
    pageId: string;
    projectId: string;
    projectUpdatesStream: false;
  };
};

export type SendMessage = CommitPayload | JoinRoomPayload;
