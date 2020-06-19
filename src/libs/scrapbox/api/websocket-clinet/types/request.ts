import { ID } from '../../../browser-api';
import { CommitChange } from '../internal/commit-change';

export type CommitRequestPayload = {
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

export type JoinRoomRequestPayload = {
  method: 'room:join';
  data: {
    projectId: string;
    pageId: string | null;
    projectUpdatesStream: false;
  };
};

export type WebsocketRequestPayload = CommitRequestPayload | JoinRoomRequestPayload;
