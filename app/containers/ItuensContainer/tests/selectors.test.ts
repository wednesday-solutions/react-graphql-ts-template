import { selectError, selectSearchTerm, selectDataToShow } from '../selector';
// import { initialState } from '../reducer';
import { RootState } from '@app/configureStore';
import { Song } from '../types';

describe('ItuneContainer selector tests', () => {
  let mockedState: RootState;
  let loading: boolean;
  let dataToShow: Song[];
  let error: string;
  let searchTerm: string;

  beforeEach(() => {
    dataToShow = [];
    error = '';
    loading = false;
    searchTerm = 'Arijit Singh';

    mockedState = {
      home: {
        dataToShow,
        error,
        loading,
        searchTerm
      }
    };

    it('should select the searchTermError', () => {
      const searchTermErrorSelector = selectError();
      console.log(searchTermErrorSelector(mockedState));
      expect(searchTermErrorSelector(mockedState)).toEqual(error);
    });

    it('should select the artistName', () => {
      const artistNameSelector = selectSearchTerm();
      expect(artistNameSelector(mockedState)).toEqual(searchTerm);
    });

    it('should select the dataToShow', () => {
      const dataToShowSelector = selectDataToShow();
      expect(dataToShowSelector).toEqual(dataToShow);
    });
  });
});
