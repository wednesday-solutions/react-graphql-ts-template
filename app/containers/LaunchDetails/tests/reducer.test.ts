// import produce from 'immer'
import launchDetailsReducer, { initialState, requestGetLaunch, successGetLaunch, failureGetLaunch } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('LaunchDetails reducer tests', () => {
  let state: typeof initialState;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(
      launchDetailsReducer(undefined, {
        type: 'SOME ACTION'
      })
    ).toEqual(state);
  });

  it('should return the update the state when an action of type requestGetLaunch is dispatched', () => {
    const expectedResult = { ...state, loading: true };
    expect(launchDetailsReducer(state, requestGetLaunch(1))).toEqual(expectedResult);
  });

  it('should update launch when successGetLaunch is dispatched', () => {
    const launch = {
      id: 1,
      missionName: 'Mission 1'
    };
    const expectedResult = {
      loading: false,
      launchError: null,
      launch
    };
    expect(launchDetailsReducer(state, successGetLaunch({ launch }))).toEqual(expectedResult);
  });

  it('should update launchError when failureGetLaunch is dispatched', () => {
    const error = {
      message: 'Unable to fetch launch'
    };
    const expectedResult = {
      loading: false,
      launchError: error.message,
      launch: {}
    };
    expect(launchDetailsReducer(state, failureGetLaunch(error))).toEqual(expectedResult);
  });
});
