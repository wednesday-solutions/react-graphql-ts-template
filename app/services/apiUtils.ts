import { create } from 'apisauce';
const api = create({ baseURL: process.env.ITUNE_URL });

type ApiParamProps = {
  artistName: string;
  pageNumber: number;
  pageSize: number;
};

export const getItune = (params: ApiParamProps) => {
  const { artistName, pageNumber, pageSize } = params;
  return api.get('/search', {
    term: artistName,
    offset: pageNumber,
    limit: pageSize
  });
};
