import { gql } from 'apollo-boost';
import { client } from '@utils/apiUtils';

interface Launches {
  launches: {
    mission_name: string;
    restOfTheFields: object;
  };
}

export const getLaunches = () =>
  client
    .query<Launches>({
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
