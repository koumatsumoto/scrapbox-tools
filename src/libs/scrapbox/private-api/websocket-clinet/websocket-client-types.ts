// only actually used values
import { ID } from '../../others';

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
  _insert: string | '_end';
  lines: {
    id: ID;
    text: string;
  };
};

export type UpdateCommitChange = {
  // target line id
  _update: string;
  lines: {
    text: string;
  };
};

export type CommitChange = InsertCommitChange | UpdateCommitChange;

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
      userId: string;
      projectId: string;
      freeze: true;
    };
  },
];

export type SendMessage = CommitSendMessage;
