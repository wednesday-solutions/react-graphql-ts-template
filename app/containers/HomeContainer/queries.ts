import { gql } from 'apollo-boost';

export const GET_LAUNCHES = gql`
  query launches($missionName: String) {
    launches(find: { mission_name: $missionName }) {
      launch_date_local
      mission_name
      links {
        wikipedia
        flickr_images
      }
    }
  }
`;

export interface LaunchesQueryVariables {
  missionName: string;
}
