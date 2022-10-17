import { generateApiClient } from '@app/utils/apiUtils';
const ituneApi = generateApiClient('itune');

type ApiParamProps = {
  artistName: string;
  pageNumber: number;
  pageSize: number;
};

export const getItune = (parms: ApiParamProps) => {
  const { artistName, pageNumber, pageSize } = parms;
  return ituneApi.get(`/search?term=${artistName}&offset=${pageNumber}&limit=${pageSize}`);
};
