import { homeContainerReducer, initialState, homeContainerTypes } from '../reducer';

describe('HomContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(homeContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type GET_LAUNCH_LIST is dispatched', () => {
    const expectedResult = { ...state, launchQuery: undefined, loading: true };
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.REQUEST_GET_LAUNCH_LIST
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the launch data is present  when SUCCESS_GET_LAUNCH_LIST is dispatched', () => {
    const launchData = {
      data: { missionName: 'Sample Launch' }
    };

    const expectedResult = { ...state, launchData: launchData.data };
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.SUCCESS_GET_LAUNCH_LIST,
        launchData
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the launchListError has some data  when failureGetLaunchList is dispatched', () => {
    const launchData = {
      errors: {
        message: 'something went wrong'
      }
    };
    const expectedResult = { ...state, launchListError: launchData.errors.message };
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.FAILURE_GET_LAUNCH_LIST,
        launchData
      })
    ).toEqual(expectedResult);
  });

  it('should return the initial state when CLEAR_LAUNCH_LIST is dispatched', () => {
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.CLEAR_LAUNCH_LIST
      })
    ).toEqual(initialState);
  });
});
