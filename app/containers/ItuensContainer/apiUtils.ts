import { create } from 'apisauce';

const api = create({ baseURL: 'https://itunes.apple.com' });

const useAxios = () => {
  const apiCall = async (param: any) => {
    console.log(param);
    try {
      const res = await api.any({ method: 'GET', url: `/search?term=${param}` });
      return res;
    } catch (error) {
      return error;
    }
  };

  return apiCall;
};

export default useAxios;
