import { generateApiClient } from '@utils/apiUtils';
const launchApi = generateApiClient('spacex');

export const getLaunches = () =>
  launchApi.post('', {
    query: `{
      launches {
        id
        mission_name
        launch_date_local
        links {
          flickr_images
          wikipedia
        }
        
      }
    }
    `
  });
