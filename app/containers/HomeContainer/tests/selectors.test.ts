import { selectHomeContainerDomain, selectLaunchData, selectLaunchListError, selectLoading } from '../selectors';
import { initialState } from '../reducer';
import { RootState } from '@app/configureStore';
import { Launch } from '../types';
describe('HomeContainer selector tests', () => {
  let mockedState: RootState;
  let launchData: { launches?: Partial<Launch>[] };
  let launchListError: Object;
  let loading: boolean;

  beforeEach(() => {
    launchData = { launches: [{}] };
    launchListError = 'There was some error while fetching the launch details';
    loading = false;

    mockedState = {
      home: {
        launchData,
        launchListError,
        loading
      }
    };
  });

  it('should select the launchListError', () => {
    const launchErrorSelector = selectLaunchListError();
    expect(launchErrorSelector(mockedState)).toEqual(launchListError);
  });

  it('should select the global state', () => {
    const selector = selectHomeContainerDomain(mockedState);
    expect(selector).toEqual(mockedState.home);
  });

  it('should select the global state from initial state if state.home is not defined', () => {
    const selector = selectHomeContainerDomain(initialState);
    expect(selector).toEqual(initialState);
  });
  it('should select  loading', () => {
    const launchLoadingSelector = selectLoading();
    expect(launchLoadingSelector(mockedState)).toEqual(loading);
  });
  it('should select the launchData', () => {
    const launchDataSelector = selectLaunchData();
    expect(launchDataSelector(mockedState)).toEqual(launchData);
  });
});
