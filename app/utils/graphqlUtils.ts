import { Launch } from '@app/containers/HomeContainer';
import ApolloClient, { DocumentNode, InMemoryCache, QueryOptions } from 'apollo-boost';

export const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql',
  cache: new InMemoryCache()
});

interface ResponseData {
  data: Launch | null;
  ok: boolean | null;
  error: Object | null;
}

export const getQueryResponse = (query: DocumentNode, variables?: QueryOptions['variables']) => {
  const responseData: ResponseData = {
    data: null,
    error: null,
    ok: false
  };
  return client
    .query<ResponseData>({ query: query, variables })
    .then((res) => {
      if (res.errors) {
        return { ...responseData, error: res.errors };
      } else {
        return { ...responseData, data: res, ok: true };
      }
    })
    .catch((err) => {
      return { ...responseData, error: err };
    });
};
