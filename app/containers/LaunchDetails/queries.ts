import { gql } from 'apollo-boost';

export const GET_LAUNCH = gql`
  query GetLaunch($launchId: ID!) {
    launch(id: $launchId) {
      id
      mission_name
      details
      rocket {
        rocket_name
        rocket_type
      }
      ships {
        name
        type
      }
      links {
        flickr_images
      }
    }
  }
`;
