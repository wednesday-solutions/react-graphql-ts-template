import { generateApiClient } from '@app/utils/apiUtils';
const ituneApi = generateApiClient('itune');

type ApiParamProps = {
  artistName: string;
  pageNumber: number;
  pageSize: number;
};

export const getItune = ({ artistName, pageNumber = 1, pageSize = 10 }: ApiParamProps) =>
  ituneApi.get(`/search?term=${artistName}&offset=${pageNumber}&limit=${pageSize}`);
