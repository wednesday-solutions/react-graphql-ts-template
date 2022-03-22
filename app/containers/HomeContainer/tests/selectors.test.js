import { selectHomeContainerDomain, selectLaunchData, selectLaunchListError, selectLaunchQuery } from '../selectors';
import { initialState } from '../reducer';
describe('HomeContainer selector tests', () => {
  let mockedState;
  let launchQuery;
  let launchData;
  let launchListError;

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

    mockedState = {
      homeContainer: {
        launchData,
        launchListError,
        launchQuery
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
});
