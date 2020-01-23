import { generateId, ID } from '../../public-api';
import {
  DeleteCommitChange,
  InsertCommitChange,
  Protocol,
  ProtocolAndPayload,
  ReceivedMessage,
  UpdateCommitChange,
} from './websocket-client-types';

export const createInsertionChange = (param: { userId: ID; position?: ID; text: string }): InsertCommitChange => {
  return {
    _insert: param.position || '_end',
    lines: {
      id: generateId(param.userId),
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

// 430[{...}}] => 430, [{}]
export const extractMessage = (message: string): ProtocolAndPayload => {
  // protocol and arbitrary number
  let header = '';
  while (message.length) {
    const head = message[0];
    // remove head if it is numeric char (part of protocol)
    if (Number.isInteger(Number.parseInt(head))) {
      header += head;
      message = message.substr(1);
    } else {
      return [header as Protocol, JSON.parse(message) as ReceivedMessage];
    }
  }

  return [header as Protocol, null];
};
