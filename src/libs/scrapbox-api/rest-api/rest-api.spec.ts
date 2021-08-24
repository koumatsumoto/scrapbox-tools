import { HttpClient } from './http-client';
import { RestApi } from './rest-api';

describe('RestApiClient', () => {
  let api: RestApi;
  let http: HttpClient;
  const token = 'auth-token in cookie';
  const dummyResponse = {} as any;
  const expectedHttpOptions = { headers: { Cookie: 'connect.sid=auth-token in cookie' } };

  beforeEach(() => {
    http = { get: jest.fn(() => Promise.resolve(dummyResponse)) };
    api = new RestApi(token, http);
  });

  describe('getMe', () => {
    test('should call api with expected arguments', async () => {
      const result = await api.getMe();
      expect(http.get).toBeCalledWith('https://scrapbox.io/api/users/me', expectedHttpOptions);
      expect(result).toEqual(dummyResponse);
    });
  });

  describe('getPage', () => {
    test('should call api with expected arguments', async () => {
      const result = await api.getPage('project name', 'page name');
      expect(http.get).toBeCalledWith('https://scrapbox.io/api/pages/project%20name/page%20name?followRename=true', expectedHttpOptions);
      expect(result).toEqual(dummyResponse);
    });
  });

  describe('getProject', () => {
    test('should call api with expected arguments', async () => {
      const result = await api.getProject('project name');
      expect(http.get).toBeCalledWith('https://scrapbox.io/api/projects/project%20name', expectedHttpOptions);
      expect(result).toEqual(dummyResponse);
    });
  });
});
