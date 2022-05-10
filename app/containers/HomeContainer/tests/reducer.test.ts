import { LaunchData } from '../types';
import homeReducer, {
  initialState,
  requestGetLaunchList,
  successGetLaunchList,
  failureGetLaunchList
} from '../reducer';

describe('HomContainer reducer tests', () => {
  let state: typeof initialState;
  const payload = {
    missionName: 'Asia',
    sort: 'asc',
    page: 1
  };
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(
      homeReducer(undefined, {
        type: undefined
      })
    ).toEqual(state);
  });

  it('should return the initial state when an action of type REQUEST_GET_LAUNCH_LIST is dispatched', () => {
    const expectedResult = { ...state, loading: true };
    expect(homeReducer(state, requestGetLaunchList(payload))).toEqual(expectedResult);
  });

  it('should ensure that the launch data is present  when SUCCESS_GET_LAUNCH_LIST is dispatched', () => {
    const launchData: LaunchData = {
      launches: [
        {
          id: '1',
          missionName: 'Sample Launch',
          launchDateUtc: '2017-01-14T10:54:00-07:00',
          launchDateUnix: 123123123,
          links: {
            wikipedia: 'wiki link',
            flickrImages: ['image1', 'image2']
          }
        }
      ]
    };

    const expectedResult = { ...state, launchData };
    expect(homeReducer(state, successGetLaunchList(launchData))).toEqual(expectedResult);
  });

  it('should ensure that the launchListError has some data  when failureGetLaunchList is dispatched', () => {
    const launchListError = {
      message: 'something went wrong'
    };
    const expectedResult = { ...state, launchListError: launchListError.message };
    expect(homeReducer(state, failureGetLaunchList(launchListError))).toEqual(expectedResult);
  });
});
