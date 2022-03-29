import find from 'lodash-es/find';
import get from 'lodash-es/get';
import history from './history';
import routeConstants from './routeConstants';

export const getCurrentRouteDetails = (location: Partial<Location>) => {
  if (!get(location, 'pathname')) {
    return null;
  }
  const route = find(
    Object.keys(routeConstants),
    (key) => routeConstants[key].route === location.pathname || `${routeConstants[key].route}/` === location.pathname
  );
  if (route) {
    return routeConstants[route];
  }
  return null;
};
export const mapKeysDeep = <T>(obj: T, fn: (key: string) => string): T =>
  Array.isArray(obj)
    ? obj.map((val) => mapKeysDeep(val, fn))
    : typeof obj === 'object'
    ? Object.keys(obj).reduce((acc, current) => {
        const key = fn(current);
        const val = obj[current as keyof T];
        acc[key] = val !== null && typeof val === 'object' ? mapKeysDeep(val, fn) : val;
        return acc;
      }, {} as any)
    : obj;

export const isLocal = () => {
  try {
    if (process.env.IS_LOCAL) {
      const local = JSON.parse(process.env.IS_LOCAL);
      return typeof local === 'boolean' && local;
    }
  } catch {
    // continue regardless of error
  }
  return false;
};

export const setQueryParam = (param: string, value: string | number, op: 'set' | 'delete' = 'set') => {
  const urlParams = new URLSearchParams(history.location.search);
  urlParams[op](param, value as string);
  history.push({ search: urlParams.toString() });
};
