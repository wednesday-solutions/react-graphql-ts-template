import { selectHomeContainerDomain, selectLaunchData, selectLaunchListError, selectLoading } from '../selectors';
import { initialState } from '../reducer';
import { RootState } from '@app/configureStore';
import { Launch } from '..';
describe('HomeContainer selector tests', () => {
  let mockedState: RootState;
  let launchData: { launches?: Partial<Launch>[] };
  let launchListError: Object;
  let loading: boolean;

  beforeEach(() => {
    launchData = {
      launches: [
        {
          missionName: 'Sample Mission'
        }
      ]
    };
    launchListError = 'There was some error while fetching the launch details';
    loading = false;

    mockedState = {
      homeContainer: {
        launchData,
        launchListError,
        loading
      }
    };
  });

  it('should select reposData', () => {
    const launchsDataSelector = selectLaunchData();
    expect(launchsDataSelector(mockedState)).toEqual(launchData);
  });

  it('should select the reposError', () => {
    const launchErrorSelector = selectLaunchListError();
    expect(launchErrorSelector(mockedState)).toEqual(launchListError);
  });

  it('should select the global state', () => {
    const selector = selectHomeContainerDomain(initialState);
    expect(selector).toEqual(initialState);
  });
  it('should select the loading state', () => {
    const loadingSelector = selectLoading();
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
});
