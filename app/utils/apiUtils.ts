import { ApisauceInstance, create } from 'apisauce';
import snakeCase from 'lodash/snakeCase';
import camelCase from 'lodash/camelCase';
import { mapKeysDeep } from './index';

const apiClients: Record<string, ApisauceInstance> = {};

export const getApiClient = () => apiClients.default;

export const generateApiClient = (type = 'spacex') => {
  switch (type) {
    case 'spacex':
      apiClients[type] = createApiClientWithTransForm(process.env.SPACEX_URL!);
      return apiClients[type];
    default:
      apiClients.default = createApiClientWithTransForm(process.env.SPACEX_URL!);
      return apiClients.default;
  }
};

export const createApiClientWithTransForm = (baseURL: string) => {
  const api = create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
  });
  api.addResponseTransform((response) => {
    const { ok, data } = response;
    if (ok && data) {
      response.data = mapKeysDeep(data, (keys: string) => camelCase(keys));
    }
    return response;
  });

  api.addRequestTransform((request) => {
    const { data } = request;
    if (data) {
      request.data = mapKeysDeep(data, (keys: string) => snakeCase(keys));
    }
    return request;
  });
  return api;
};
