import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getLaunches } from '../launchApi';

describe('RepoApi tests', () => {
  it('should make the api call to "/graphql"', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = {
      launches: [
        {
          missioName: 'sample name'
        }
      ]
    };
    mock.onPost().reply(200, data);
    const res = await getLaunches();
    expect(res.data).toEqual(data);
  });
});
