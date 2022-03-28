import { takeLatest, call, put } from 'redux-saga/effects';
import { apiResponseGenerator } from '@utils/testUtils';
import homeContainerSaga, { getLaunchList } from '../saga';
import { HomeContainerState, homeContainerTypes } from '../reducer';
import { getQueryResponse } from '@app/utils/graphqlUtils';
import { GET_LAUNCHES } from '../queries';

describe('HomeContainer saga tests', () => {
  const generator = homeContainerSaga();
  let getLaunchListGenerator = getLaunchList({ type: 'SOME ACTION' });

  it('should start task to watch for REQUEST_GET_LAUNCH_LIST action', () => {
    expect(generator.next().value).toEqual(takeLatest(homeContainerTypes.REQUEST_GET_LAUNCH_LIST, getLaunchList));
  });

  it('should ensure that the action FAILURE_GET_LAUNCH_LIST is dispatched when the api call fails', () => {
    let missionName;
    const res = getLaunchListGenerator.next().value;
    expect(res).toEqual(call(getQueryResponse, GET_LAUNCHES, { missionName }));
    const errorResponse = {
      errorMessage: 'There was an error while fetching launch informations.'
    };
    expect(
      getLaunchListGenerator.next(apiResponseGenerator<HomeContainerState['launchData']>(false, {}, errorResponse))
        .value
    ).toEqual(
      put({
        type: homeContainerTypes.FAILURE_GET_LAUNCH_LIST,
        launchListError: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_LAUNCH_LIST is dispatched when the api call succeeds', () => {
    getLaunchListGenerator = getLaunchList({ type: 'SOME_ACTION' });
    const res = getLaunchListGenerator.next().value;
    let missionName;
    expect(res).toEqual(call(getQueryResponse, GET_LAUNCHES, { missionName }));
    const apiResponse = {
      launches: [
        {
          missionName: 'sampleName',
          launchDateLocal: 'some date',
          links: {
            wikipedia: 'wiki link',
            flickrImages: ['image1', 'image2']
          }
        }
      ]
    };
    expect(
      getLaunchListGenerator.next(apiResponseGenerator<HomeContainerState['launchData']>(true, apiResponse)).value
    ).toEqual(
      put({
        type: homeContainerTypes.SUCCESS_GET_LAUNCH_LIST,
        launchData: apiResponse
      })
    );
  });
});
