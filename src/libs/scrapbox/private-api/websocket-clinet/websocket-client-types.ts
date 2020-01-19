// only actually used values
import { ID } from '../../public-api';

export type Protocol = '0' | '40' | '42' | '420' | '421' | '422' | '423' | '430' | '431' | '432' | '433';

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

export type CommitSendMessage = [
  'socket.io-request',
  {
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
  },
];

export type SendMessage = CommitSendMessage;
