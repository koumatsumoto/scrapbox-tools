import { CommitChange, Protocol, ProtocolAndPayload, ReceivedMessage } from './websocket-client-types';

export const createJoinRoomMessage = (param: { projectId: string; pageId: string }) => {
  const payload = [
    'socket.io-request',
    {
      method: 'room:join',
      data: {
        pageId: param.pageId,
        projectId: param.projectId,
        projectUpdatesStream: false,
      },
    },
  ];

  return `420${JSON.stringify(payload)}`;
};

export const createCommitMessage = (param: {
  projectId: string;
  userId: string;
  pageId: string;
  parentId: string;
  changes: CommitChange[];
}) => {
  const protocol = '421';
  const payload = [
    'socket.io-request',
    {
      method: 'commit',
      data: {
        kind: 'page',
        parentId: param.parentId,
        changes: param.changes,
        cursor: null,
        pageId: param.pageId,
        userId: param.userId,
        projectId: param.projectId,
        freeze: true,
      },
    },
  ];

  return `${protocol}${JSON.stringify(payload)}`;
};

export const createUpdateSingleLineChange = (param: { id: string; text: string }): CommitChange => {
  return {
    _update: param.id,
    lines: {
      text: param.text,
    },
  };
};

// 430[{...}}] => 430, [{}]
export const extractMessage = (message: string): ProtocolAndPayload => {
  let protocol = '';
  while (message.length) {
    const head = message[0];
    // remove head if it is numeric char (part of protocol)
    if (Number.isInteger(Number.parseInt(head))) {
      protocol += head;
      message = message.substr(1);
    } else {
      return [protocol as Protocol, JSON.parse(message) as ReceivedMessage];
    }
  }

  return [protocol as Protocol, null];
};
