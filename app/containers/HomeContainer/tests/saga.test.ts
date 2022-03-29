import { takeLatest, call, put } from 'redux-saga/effects';
import { apiResponseGenerator } from '@utils/testUtils';
import homeContainerSaga, { getLaunchList } from '../saga';
import { homeContainerTypes } from '../reducer';
import { getQueryResponse } from '@app/utils/graphqlUtils';
import { GET_LAUNCHES } from '../queries';
import { LAUNCH_PER_PAGE } from '../usePaginate';

describe('HomeContainer saga tests', () => {
  const generator = homeContainerSaga();
  let getLaunchListGenerator = getLaunchList({
    type: 'SOME ACTION',
    missionName: null,
    order: null,
    page: 1
  });

  it('should start task to watch for REQUEST_GET_LAUNCH_LIST action', () => {
    expect(generator.next().value).toEqual(takeLatest(homeContainerTypes.REQUEST_GET_LAUNCH_LIST, getLaunchList));
  });

  it('should ensure that the action FAILURE_GET_LAUNCH_LIST is dispatched when the api call fails', () => {
    const res = getLaunchListGenerator.next().value;
    expect(res).toEqual(
      call(getQueryResponse, GET_LAUNCHES, {
        missionName: null,
        order: null,
        sort: 'launch_date_local',
        limit: LAUNCH_PER_PAGE,
        offset: 0
      })
    );
    const errorResponse = {
      message: 'There was an error while fetching launch informations.'
    };
    expect(getLaunchListGenerator.next(apiResponseGenerator(false, {}, errorResponse)).value).toEqual(
      put({
        type: homeContainerTypes.FAILURE_GET_LAUNCH_LIST,
        launchListError: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_LAUNCH_LIST is dispatched when the api call succeeds', () => {
    getLaunchListGenerator = getLaunchList({
      type: 'SOME_ACTION',
      missionName: null,
      order: null,
      page: 1
    });
    const res = getLaunchListGenerator.next().value;
    expect(res).toEqual(
      call(getQueryResponse, GET_LAUNCHES, {
        missionName: null,
        order: null,
        sort: 'launch_date_local',
        limit: LAUNCH_PER_PAGE,
        offset: 0
      })
    );
    const apiResponse = {
      launches: [
        {
          id: '1',
          missionName: 'sampleName',
          launchDateLocal: 'some date',
          launchDateUnix: 123121232,
          links: {
            wikipedia: 'wiki link',
            flickrImages: ['image1', 'image2']
          }
        }
      ]
    };
    expect(getLaunchListGenerator.next(apiResponseGenerator(true, apiResponse)).value).toEqual(
      put({
        type: homeContainerTypes.SUCCESS_GET_LAUNCH_LIST,
        launchData: apiResponse
      })
    );
  });
});
