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

interface SetQueryParamOptions {
  param: string;
  value?: string | number;
  deleteParam?: boolean;
  historyOp?: 'push' | 'replace';
}

export const setQueryParam = ({ param, value, deleteParam, historyOp = 'push' }: SetQueryParamOptions) => {
  const urlParams = new URLSearchParams(history.location.search);
  if (deleteParam) {
    urlParams.delete(param);
  } else {
    urlParams.set(param, String(value));
  }
  if (typeof history[historyOp] === 'function') {
    history[historyOp]({ search: urlParams.toString() });
  } else {
    throw new Error('Invalid history operation');
  }
};

export const prepare = (payload: any) => ({ payload });
