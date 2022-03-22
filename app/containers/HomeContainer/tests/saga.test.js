import { takeLatest, call, put } from 'redux-saga/effects';
import { getLaunches } from '@services/launchApi';
import { apiResponseGenerator } from '@utils/testUtils';
import homeContainerSaga, { getLaunchList } from '../saga';
import { homeContainerTypes } from '../reducer';

describe('HomeContainer saga tests', () => {
  const generator = homeContainerSaga();
  let getLaunchListGenerator = getLaunchList();

  it('should start task to watch for REQUEST_GET_GITHUB_REPOS action', () => {
    expect(generator.next().value).toEqual(takeLatest(homeContainerTypes.REQUEST_GET_LAUNCH_LIST, getLaunchList));
  });

  it('should ensure that the action FAILURE_GET_LAUNCH_LIST is dispatched when the api call fails', () => {
    const res = getLaunchListGenerator.next().value;
    expect(res).toEqual(call(getLaunches));
    const errorResponse = {
      errorMessage: 'There was an error while fetching launch informations.'
    };
    expect(getLaunchListGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: homeContainerTypes.FAILURE_GET_LAUNCH_LIST,
        launchListError: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_GITHUB_REPOS is dispatched when the api call succeeds', () => {
    getLaunchListGenerator = getLaunchList();
    const res = getLaunchListGenerator.next().value;
    expect(res).toEqual(call(getLaunches));
    const apiResponse = {
      launches: [{ missionName: 'samepleName' }]
    };
    expect(getLaunchListGenerator.next(apiResponseGenerator(true, apiResponse)).value).toEqual(
      put({
        type: homeContainerTypes.SUCCESS_GET_LAUNCH_LIST,
        launchData: apiResponse
      })
    );
  });

  it('should call FAILURE_GET_LAUNCH_LIST if the data has errors', () => {
    getLaunchListGenerator = getLaunchList();
    const res = getLaunchListGenerator.next().value;
    expect(res).toEqual(call(getLaunches));
    const apiResponse = {
      launches: {},
      errors: {
        message: 'This is sample error'
      }
    };

    expect(getLaunchListGenerator.next(apiResponseGenerator(true, apiResponse)).value).toEqual(
      put({
        type: homeContainerTypes.FAILURE_GET_LAUNCH_LIST,
        launchListError: apiResponse
      })
    );
  });
});
