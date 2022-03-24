import { gql } from 'apollo-boost';

export const GET_LAUNCHES = gql`
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
