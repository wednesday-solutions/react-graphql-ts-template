import { generateApiClient } from '@app/utils/apiUtils';
const ituneApi = generateApiClient('itune');

export const getItune = (param: any) => ituneApi.get(`/search?term=${param}&limit=10&offset=20`);
