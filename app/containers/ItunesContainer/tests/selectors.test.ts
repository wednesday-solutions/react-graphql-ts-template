import { selectSongData, selectItuneState, selectLoading, selectSongListError } from '../selector';
import { initialState } from '../reducer';
import { RootState } from '@app/configureStore';
import { Song } from '../types';

describe('', () => {
  let mockedState: RootState;
  let songData: { results: Partial<Song>[] };
  let songListError: Object;
  let loading: boolean;

  beforeEach(() => {
    songData = { results: [{}] };
    songListError = 'Something went wrong';
    loading = false;

    mockedState = {
      songReducer: {
        songData,
        songListError,
        loading
      }
    };
  });

  it('should select the songListError', () => {
    const songErrorSelector = selectSongListError();
    expect(songErrorSelector(mockedState)).toEqual(songListError);
  });

  it('should select the global state', () => {
    const selector = selectItuneState(mockedState);
    expect(selector).toEqual(mockedState.songReducer);
  });

  it('should select the global state from initial state if state.ituneReducer is not defined', () => {
    const selector = selectItuneState(initialState);
    expect(selector).toEqual(initialState);
  });

  it('should select the loading', () => {
    const songLoadingSelector = selectLoading();
    expect(songLoadingSelector(mockedState)).toEqual(loading);
  });

  it('should select the songData', () => {
    const songDataSelector = selectSongData();
    expect(songDataSelector(mockedState)).toEqual(songData);
  });
});
