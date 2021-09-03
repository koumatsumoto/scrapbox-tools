import { socketIoMessageDeserializer } from './serializer';

test('socketIoDeserializer', () => {
  expect(socketIoMessageDeserializer({ data: '430["value"]' })).toEqual({
    packetType: '430',
    data: ['value'],
  });
  expect(socketIoMessageDeserializer({ data: '0' })).toEqual({
    packetType: '0',
    data: undefined,
  });
});
