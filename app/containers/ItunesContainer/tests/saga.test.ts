import { call, put, takeLatest } from 'redux-saga/effects';
import { getItune } from '@app/services/apiUtils';
import { apiResponseGenerator } from '@app/utils/testUtils';
import { requestGetSongList, successGetSongList } from '@app/containers/SongProviderContainer/reducer';
import ituneCallSaga, { fetchDataFromItune } from '../saga';

describe('ItuneContainer saga tests', () => {
  const generator = ituneCallSaga();
  const getSongListGenerator = fetchDataFromItune({ payload: null });

  it('should start the task to watch for GET_SEARCH_TERM action', () => {
    expect(generator.next().value).toEqual(takeLatest(requestGetSongList.toString(), fetchDataFromItune));
  });

  it('should ensure that the action FAILURE_GET_SEARCH_TERM is dispatched when the api calls fails', () => {
    const res = getSongListGenerator.next().value;
    const requestObj = {
      artistName: '',
      pageNumber: 0,
      pageSize: 0
    };
    const { artistName, pageNumber, pageSize } = requestObj;
    expect(res).toEqual(call(getItune, { artistName, pageNumber, pageSize }));
  });

  it('should ensure that the action SUCCESS_GET_SEARCH_TEERM is dispatched when the api calls succeeds', () => {
    const artistName = 'Arijit Singh';
    const getSongListGenerator = fetchDataFromItune({
      payload: { artistName: artistName, pageNumber: 1, pageSize: 10 }
    });
    const res = getSongListGenerator.next().value;
    expect(res).toEqual(call(getItune, { artistName, pageNumber: 1, pageSize: 10 }));
    const apiResponse = [
      {
        trackId: 1,
        artistName: 'Yung Xiety',
        artworkUrl100:
          'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/3b/cc/31/3bcc315a-e58f-c678-8d05-b7d62346070f/1d724fe3-daaa-4825-91f0-a47e70a438bd.jpg/100x100bb.jpg',
        collectionName: 'Arijit Singh (Mashup) - Single'
      }
    ];
    expect(getSongListGenerator.next(apiResponseGenerator(true, apiResponse, {})).value).toEqual(
      put(successGetSongList(apiResponse))
    );
  });
});
