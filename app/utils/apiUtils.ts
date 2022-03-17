import { ApisauceInstance, create } from 'apisauce';
import snakeCase from 'lodash/snakeCase';
import camelCase from 'lodash/camelCase';
import { mapKeysDeep } from './index';

const apiClients: Record<string, ApisauceInstance> = {};

export const getApiClient = (type = 'github') => apiClients[type];

export const generateApiClient = (type = 'github') => {
  switch (type) {
    case 'github':
      apiClients[type] = createApiClientWithTransForm(process.env.GITHUB_URL!);
      return apiClients[type];
    default:
      apiClients.default = createApiClientWithTransForm(process.env.GITHUB_URL!);
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
