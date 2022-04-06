import { takeLatest, call, put } from 'redux-saga/effects';
import { apiResponseGenerator } from '@utils/testUtils';
import homeContainerSaga, { getLaunchList } from '../saga';
import { getQueryResponse } from '@app/utils/graphqlUtils';
import { GET_LAUNCHES } from '../queries';
import { LAUNCH_PER_PAGE } from '../usePaginate';
import { failureGetLaunchList, requestGetLaunchList, successGetLaunchList } from '../reducer';

describe('HomeContainer saga tests', () => {
  const generator = homeContainerSaga();
  let getLaunchListGenerator = getLaunchList({
    type: 'SOME ACTION',
    payload: {
      missionName: null,
      order: null,
      page: 1
    }
  });

  it('should start task to watch for REQUEST_GET_LAUNCH_LIST action', () => {
    expect(generator.next().value).toEqual(takeLatest(requestGetLaunchList.toString(), getLaunchList));
  });

  it('should ensure that the action FAILURE_GET_LAUNCH_LIST is dispatched when the api call fails', () => {
    const res = getLaunchListGenerator.next().value;
    expect(res).toEqual(
      call(getQueryResponse, GET_LAUNCHES, {
        missionName: null,
        order: null,
        sort: 'launch_date_utc',
        limit: LAUNCH_PER_PAGE,
        offset: 0
      })
    );
    const errorResponse = {
      message: 'There was an error while fetching launch informations.'
    };
    expect(getLaunchListGenerator.next(apiResponseGenerator(false, {}, errorResponse)).value).toEqual(
      put(failureGetLaunchList(errorResponse))
    );
  });

  it('should ensure that the action SUCCESS_GET_LAUNCH_LIST is dispatched when the api call succeeds', () => {
    getLaunchListGenerator = getLaunchList({
      type: 'SOME_ACTION',
      payload: {
        missionName: null,
        order: null,
        page: 1
      }
    });
    const res = getLaunchListGenerator.next().value;
    expect(res).toEqual(
      call(getQueryResponse, GET_LAUNCHES, {
        missionName: null,
        order: null,
        sort: 'launch_date_utc',
        limit: LAUNCH_PER_PAGE,
        offset: 0
      })
    );
    const apiResponse = {
      launches: [
        {
          id: '1',
          missionName: 'sampleName',
          launchDateUtc: '2017-01-14T10:54:00-07:00',
          launchDateUnix: 123121232,
          links: {
            wikipedia: 'wiki link',
            flickrImages: ['image1', 'image2']
          }
        }
      ]
    };
    expect(getLaunchListGenerator.next(apiResponseGenerator(true, apiResponse)).value).toEqual(
      put(successGetLaunchList(apiResponse))
    );
  });
});
