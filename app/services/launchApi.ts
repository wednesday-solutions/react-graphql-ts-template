import { gql } from 'apollo-boost';
import { client } from '@utils/apiUtils';
import { launch } from '@app/containers/HomeContainer';

export const getLaunches = () =>
  client
    .query<launch>({
      query: GET_LAUNCHES
    })
    .then((res) => ({
      data: res,
      ok: true
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
