import { client } from '@app/utils/graphqlUtils';
import { getLaunches } from '../launchApi';

describe('LaunchApi tests', () => {
  it('should make the api call to "/graphql"', async () => {
    const res = await getLaunches();
    expect(res.data).toEqual({ query: {} });
    expect(res.ok).toEqual(true);
  });
  it('should  throw error if the client response with an error', async () => {
    jest.spyOn(client, 'query').mockReturnValueOnce(Promise.reject(new Error()));
    const res = await getLaunches();
    expect(res.data).toEqual(new Error());
    expect(res.ok).toEqual(false);
  });
});
