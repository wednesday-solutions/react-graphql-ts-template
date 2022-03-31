import { gql } from 'apollo-boost';

export const GET_LAUNCHES = gql`
  query launches($missionName: String, $order: String, $limit: Int, $offset: Int) {
    launches(
      find: { mission_name: $missionName }
      sort: "launch_date_utc"
      order: $order
      limit: $limit
      offset: $offset
    ) {
      id
      launch_date_utc
      launch_date_unix
      mission_name
      links {
        wikipedia
        flickr_images
      }
    }
  }
`;
