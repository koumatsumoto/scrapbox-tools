// only actually used values
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

export type CommitChanges = [
  {
    _insert: '_end';
    lines: {
      id: string;
      text: string;
    };
  },
  {
    // line id?
    _update: string;
    lines: {
      text: string;
    };
  },
];

export type CommitSendMessage = [
  'socket.io-request',
  {
    method: 'commit';
    data: {
      kind: 'page';
      // last committed id
      parentId: string;
      changes: CommitChanges;
      cursor: null;
      pageId: string;
      userId: string;
      projectId: string;
      freeze: true;
    };
  },
];

export type SendMessage = CommitSendMessage;
