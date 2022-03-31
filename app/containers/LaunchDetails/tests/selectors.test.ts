import { initialState } from '@app/containers/LaunchDetails/reducer';
import { selectLaunch, selectLaunchDetailsDomain, selectLaunchError, selectLoading } from '../selectors';

describe('LaunchDetails selector tests', () => {
  let mockedState: { launchDetails: any };
  let launch: {};
  let launchError: string;
  let loading: boolean;

  beforeAll(() => {
    launch = {};
    launchError = 'new LaunchError("_^_")';
    loading = false;

    mockedState = {
      launchDetails: {
        launch,
        launchError,
        loading
      }
    };
  });

  it('should select the launchDetails state', () => {
    expect(selectLaunchDetailsDomain(mockedState)).toEqual(mockedState.launchDetails);
  });

  it('should select initial state when launchDetails not preset in state', () => {
    expect(selectLaunchDetailsDomain({})).toEqual(initialState);
  });

  it('should select launch', () => {
    const launchSelector = selectLaunch();
    expect(launchSelector(mockedState)).toEqual(launch);
  });

  it('should select launchError', () => {
    const launchErrorSelector = selectLaunchError();
    expect(launchErrorSelector(mockedState)).toEqual(launchError);
  });

  it('should select loading', () => {
    const loadingSelector = selectLoading();
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
});
