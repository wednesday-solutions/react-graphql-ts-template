import {
  selectHomeContainerDomain,
  selectLaunchData,
  selectLaunchListError,
  selectLaunchQuery,
  selectLoading
} from '../selectors';
import { initialState } from '../reducer';
describe('HomeContainer selector tests', () => {
  let mockedState;
  let launchQuery;
  let launchData;
  let launchListError;
  let loading;

  beforeEach(() => {
    launchData = {
      launches: [
        {
          missionName: 'Sample Mission'
        }
      ]
    };
    launchListError = 'There was some error while fetching the launch details';
    launchQuery = 'mission 1';
    loading = false;

    mockedState = {
      homeContainer: {
        launchData,
        launchListError,
        launchQuery,
        loading
      }
    };
  });

  it('should select reposData', () => {
    const launchsDataSelector = selectLaunchData();
    expect(launchsDataSelector(mockedState)).toEqual(launchData);
  });

  it('should select the launchQuery', () => {
    const repoSelector = selectLaunchQuery();
    expect(repoSelector(mockedState)).toEqual(launchQuery);
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
