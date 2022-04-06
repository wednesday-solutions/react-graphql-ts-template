import camelCase from 'lodash-es/camelCase';
import { getCurrentRouteDetails, isLocal, mapKeysDeep, setQueryParam } from '@utils/index';
import routeConstants from '@utils/routeConstants';
import history from '../history';

describe('Tests for getCurrentRouteDetails method', () => {
  const location: Partial<Location> = {};
  it('should return null if pathname is not available', () => {
    expect(getCurrentRouteDetails(location)).toEqual(null);
  });

  it('should return the details of the route', () => {
    const location = { pathname: '/' };
    expect(getCurrentRouteDetails(location)).toEqual(routeConstants.home);
  });

  it('should return null of the route if pathname is not in routeConstants', () => {
    const location = { pathname: '/launches' };
    expect(getCurrentRouteDetails(location)).toEqual(null);
  });
});

describe('Tests for isLocal method', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should return true if process.env.IS_LOCAL is true', () => {
    process.env.IS_LOCAL = 'true';
    expect(isLocal()).toBe(true);
  });
  it('should return false if when process.env.IS_LOCAL is not present', () => {
    expect(isLocal()).toBe(false);
  });
  it('should return false if process.env.IS_LOCAL has exceptional value', () => {
    process.env.IS_LOCAL = 'trusae';
    expect(isLocal()).toBe(false);
  });
});

describe('Tests for mapKeysDeep method', () => {
  let fn: (str: string) => string;
  beforeAll(() => {
    fn = (keys: string) => camelCase(keys);
  });
  it('should return something objet', () => {
    const obj = {
      locationone: '/route1',
      locationtwo: '/route2',
      locationthree: { locationone: '/route1', locationtwo: '/route2' }
    };
    expect(mapKeysDeep(obj, fn)).toEqual(obj);
  });

  it('should operate array accordingly', () => {
    const arr = [{ locationone: '/route1', locationtwo: '/route2' }];
    expect(mapKeysDeep(arr, fn)).toEqual(arr);
  });

  it('should return the passed value if its not an array or object', () => {
    expect(mapKeysDeep(10, fn)).toEqual(10);
  });
});

describe('setQueryParam tests', () => {
  it('should set query param to given value', () => {
    history.location.search = '';
    setQueryParam({ param: 'key', value: 'value' });
    expect(history.location.search).toEqual('?key=value');
  });

  it('should delete query param if deleteParan is true', () => {
    history.location.search = '?key=value';
    setQueryParam({ param: 'key', deleteParam: true });
    expect(history.location.search).toEqual('');
  });

  it('should throw error if history[historyOp] is not function', () => {
    history.location.search = '?key=value';
    expect(() => setQueryParam({ param: 'key', deleteParam: true, historyOp: 'unknown' as any })).toThrow(
      Error('Invalid history operation')
    );
  });
});
