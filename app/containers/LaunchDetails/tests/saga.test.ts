/**
 * Test launchDetails sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { getQueryResponse } from '@app/utils/graphqlUtils';
import { apiResponseGenerator } from '@app/utils/testUtils';
import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_LAUNCH } from '../queries';
import { failureGetLaunch, requestGetLaunch, successGetLaunch } from '../reducer';
import launchDetailsSaga, { getLaunch } from '../saga';

describe('LaunchDetails saga tests', () => {
  const generator = launchDetailsSaga();

  it('should start task to watch for REQUEST_GET_LAUNCH action', () => {
    expect(generator.next().value).toEqual(takeLatest(requestGetLaunch.toString(), getLaunch));
  });

  it('should give call effect on first yield of getLaunch generator ', () => {
    const launchGenerator = getLaunch({ type: requestGetLaunch.toString(), payload: 1 });
    expect(launchGenerator.next().value).toEqual(call(getQueryResponse, GET_LAUNCH, { launchId: 1 }));
  });

  it('should ensure that SUCCESS_GET_LAUNCH action is dispatched when call effect succeeds', () => {
    const launch = {
      id: '10',
      missionName: 'CRS-2',
      details: 'Last launch of the original Falcon 9 v1.0 launch vehicle',
      rocket: {
        rocketName: 'Falcon 9',
        rocketType: 'v1.0'
      },
      ships: [
        {
          name: 'American Islander',
          type: 'Cargo'
        }
      ],
      links: {
        flickrImages: []
      }
    };
    const launchGenerator = getLaunch({ type: requestGetLaunch.toString(), payload: 1 });
    launchGenerator.next();
    expect(launchGenerator.next(apiResponseGenerator(true, { ...launch })).value).toEqual(
      put(successGetLaunch(launch))
    );
  });

  it('should ensure that SUCCESS_GET_LAUNCH action is dispatched when call effect fails', () => {
    const error = {
      message: 'some error'
    };
    const launchGenerator = getLaunch({ type: requestGetLaunch.toString(), payload: 1 });
    launchGenerator.next();
    expect(launchGenerator.next(apiResponseGenerator(false, undefined, error)).value).toEqual(
      put(failureGetLaunch(error))
    );
  });
});
