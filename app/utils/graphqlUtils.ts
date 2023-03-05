import ApolloClient, { DocumentNode, InMemoryCache } from 'apollo-boost';
import camelCase from 'lodash-es/camelCase';
import { mapKeysDeep } from '.';

export const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql',
  cache: new InMemoryCache()
});

export interface GqlQueryReponse<Data> {
  data?: Data;
  error?: any;
  ok: boolean;
}

export const getQueryResponse = <Data, Variables>(
  query: DocumentNode,
  variables?: Variables
): Promise<GqlQueryReponse<Data>> => {
  return client
    .query<Data, Variables>({ query, variables })
    .then((res) => {
      if (res.errors) {
        return { error: res.errors, ok: false };
      } else {
        return { data: mapKeysDeep(res.data, camelCase), ok: true };
      }
    })
    .catch((err) => {
      return { error: err, ok: false };
    });
};
