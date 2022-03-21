import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getLaunches } from '../launchApi';

describe('RepoApi tests', () => {
  it('should make the api call to "/search/repositories?q="', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = [
      {
        totalCount: 1,
        items: []
      }
    ];
    mock.onGet().reply(200, data);
    const res = await getLaunches();
    expect(res.data).toEqual(data);
  });
});
