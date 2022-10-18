import { create } from 'apisauce';
const api = create({ baseURL: 'https://itunes.apple.com' });

type ApiParamProps = {
  artistName: string;
  pageNumber: number;
  pageSize: number;
};

export const getItune = (params: ApiParamProps) => {
  const { artistName, pageNumber, pageSize } = params;
  return api.get('https://itunes.apple.com/search', {
    term: artistName,
    offset: pageNumber,
    limit: pageSize
  });
};
