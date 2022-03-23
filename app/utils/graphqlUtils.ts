import { Launch } from '@app/containers/HomeContainer';
import ApolloClient, { DocumentNode, InMemoryCache } from 'apollo-boost';

export const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql',
  cache: new InMemoryCache()
});

interface responseData {
  data: Launch | null;
  ok: boolean | null;
  error: Object | null;
}

export const getQueryResponse = (query: DocumentNode) => {
  const responseData: responseData = {
    data: null,
    error: null,
    ok: false
  };
  return client
    .query<responseData>({ query: query })
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
