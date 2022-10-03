import { create } from 'apisauce';

const api = create({ baseURL: 'https://itunes.apple.com' });

const useApiSauce = async (param: any) => {
  try {
    console.log('in API');
    const res = await api.get(`/search?term=${param}`);
    return res;
  } catch (error) {
    return error;
  }
};

export default useApiSauce;
