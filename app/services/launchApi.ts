import { generateApiClient } from '@utils/apiUtils';
const repoApi = generateApiClient('github');

export const getLaunches = () =>
  repoApi.post('', {
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
