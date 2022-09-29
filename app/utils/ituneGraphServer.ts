import ApolloClient, { DocumentNode, InMemoryCache } from 'apollo-boost';

export const client = new ApolloClient({
  uri: 'https://itunes.apple.com/search?term=',
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
  console.log(query, 'in graphql server');
  return client
    .query<Data, Variables>({ query, variables })
    .then((res) => {
      console.log(res, 'in graphql');
      if (res.errors) {
        console.log(res);
        return { error: res.errors, ok: false };
      } else {
        console.log(res);
        return { data: res.data, ok: true };
      }
    })
    .catch((err) => {
      return { error: err, ok: false };
    });
};
