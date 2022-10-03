import { SongData } from '../types';
import ituneReducer, { initialState, getSearchTerm, getDataToShow, getErrorFromResponse } from '../reducer';

describe('ItuneContainer reducer test', () => {
  let state: typeof initialState;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(
      ituneReducer(undefined, {
        type: undefined
      })
    ).toEqual(state);
  });

  it('should return the initial state when an actual action of type REQUEST_GET_SEARCH_TERM is dispatch', () => {
    const payload = 'Arijit Singh';
    const expectedState = { ...state, loading: true, searchTerm: 'Arijit Singh' };
    expect(ituneReducer(state, getSearchTerm(payload))).toEqual(expectedState);
  });

  it('should ensure that the search data is present when SUCCESS_GET_SEARCH_TERM', () => {
    const dataToShow: SongData = {
      Songs: [
        {
          trackId: 1,
          artistName: 'Yung Xiety',
          artworkUrl100:
            'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/3b/cc/31/3bcc315a-e58f-c678-8d05-b7d62346070f/1d724fe3-daaa-4825-91f0-a47e70a438bd.jpg/100x100bb.jpg',
          collectionName: 'Arijit Singh (Mashup) - Single'
        }
      ]
    };
    const expectedState = { ...state, dataToShow };
    expect(ituneReducer(state, getDataToShow(dataToShow))).toEqual(expectedState);
  });

  it('should ensure that the error has some data when getErrorFromResponse is dispatch', () => {
    const payload = 'Something went wrong';
    const error = 'Something went wrong';
    const expectedState = { ...state, error: error };
    expect(ituneReducer(state, getErrorFromResponse(payload))).toEqual(expectedState);
  });
});
