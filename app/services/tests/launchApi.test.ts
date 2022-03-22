import { getLaunches } from '../launchApi';

describe('LaunchApi tests', () => {
  it('should make the api call to "/graphql"', async () => {
    const res = await getLaunches();
    expect(res.data).toEqual({ query: {} });
    expect(res.ok).toEqual(true);
  });
});
