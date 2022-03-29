import { gql } from 'apollo-boost';
import { client, getQueryResponse } from '../graphqlUtils';

describe('graphql utils tests', () => {
  const sampleQuery = gql`
    query {
      launches {
        id
      }
    }
  `;

  it('should call a query and return the response', async () => {
    const res = await getQueryResponse(sampleQuery);
    expect(res.data).toBeUndefined();
    expect(res.ok).toEqual(true);
  });
  it('should return an error when the client sends an error', async () => {
    jest.spyOn(client, 'query').mockReturnValueOnce(Promise.reject(new Error()));
    const res = await getQueryResponse(sampleQuery);
    expect(res.data).toBeUndefined();
    expect(res.ok).toEqual(false);
    expect(res.error).toEqual(new Error());
  });

  it('should return an error when the response has an error', async () => {
    jest.spyOn(client, 'query').mockResolvedValue({ errors: 'sample error' } as any);
    const res = await getQueryResponse(sampleQuery);
    expect(res.data).toBeUndefined();
    expect(res.ok).toEqual(false);
    expect(res.error).toEqual('sample error');
  });
});
