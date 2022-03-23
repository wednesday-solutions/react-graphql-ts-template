import { gql } from 'apollo-boost';
import { client } from '@utils/graphqlUtils';
import { launch } from '@app/containers/HomeContainer';

export const getLaunches = () =>
  client
    .query<launch>({
      query: GET_LAUNCHES
    })
    .then((res) => ({
      data: res,
      ok: true
    }))
    .catch((err) => ({
      data: err,
      res: false
    }));

const GET_LAUNCHES = gql`
  query {
    launches {
      launch_date_local
      mission_name
      links {
        wikipedia
        flickr_images
      }
    }
  }
`;
