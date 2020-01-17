import { CommitChanges, ReceivedMessage } from './websocket-client-types';

export const createJoinRoomMessage = (param: { projectId: string }) => {
  const payload = [
    'socket.io-request',
    {
      method: 'room:join',
      data: {
        pageId: null,
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
  changes: CommitChanges;
}) => {
  const protocol = '42';
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

  return `${protocol}${payload}`;
};

// 430[{...}}] => 430, [{}]
export const extractMessage = (message: string): [string, ReceivedMessage] => {
  let protocol = '';
  while (message.length) {
    const head = message[0];
    // remove head if it is numeric char (part of protocol)
    if (Number.isInteger(Number.parseInt(head))) {
      protocol += head;
      message = message.substr(1);
    } else {
      return [protocol, JSON.parse(message) as ReceivedMessage];
    }
  }

  return [protocol, null];
};
