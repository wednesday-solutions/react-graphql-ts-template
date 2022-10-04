import { generateApiClient } from '@app/utils/apiUtils';
const ituneApi = generateApiClient('itune');

export const useApiSauce = (param: any) => ituneApi.get(`/search?term=${param}`);
