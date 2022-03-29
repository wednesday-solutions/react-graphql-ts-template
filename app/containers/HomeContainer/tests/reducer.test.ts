import { LaunchData } from '..';
import { homeContainerReducer, initialState, homeContainerTypes } from '../reducer';

describe('HomContainer reducer tests', () => {
  let state: typeof initialState;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(homeContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type REQUEST_GET_LAUNCH_LIST is dispatched', () => {
    const expectedResult = { ...state, loading: true };
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.REQUEST_GET_LAUNCH_LIST
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the launch data is present  when SUCCESS_GET_LAUNCH_LIST is dispatched', () => {
    const launchData: LaunchData = {
      launches: [
        {
          id: '1',
          missionName: 'Sample Launch',
          launchDateLocal: 'some date',
          launchDateUnix: 123123123,
          links: {
            wikipedia: 'wiki link',
            flickrImages: ['image1', 'image2']
          }
        }
      ]
    };

    const expectedResult = { ...state, launchData };
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.SUCCESS_GET_LAUNCH_LIST,
        launchData
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the launchListError has some data  when failureGetLaunchList is dispatched', () => {
    const launchListError = {
      message: 'something went wrong'
    };
    const expectedResult = { ...state, launchListError: launchListError.message };
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.FAILURE_GET_LAUNCH_LIST,
        launchListError
      })
    ).toEqual(expectedResult);
  });
});
