import { call, put, takeLatest } from 'redux-saga/effects';
import { getErrorFromResponse, getSearchTerm, getDataToShow } from '../reducer';
import { apiResponseGenerator, SongData } from '../types';
import useApiSauce from '@app/services/apiUtils';
import ituneCallSaga, { fetchDataFromItune } from '../saga';

describe('ItuneContainer saga test', () => {
  const generator = ituneCallSaga();
  const getSongListGenerator = fetchDataFromItune({ payload: null });

  it('should start the task to watch for GET_SEARCH_TERM action', () => {
    expect(generator.next().value).toEqual(takeLatest(getSearchTerm.toString(), fetchDataFromItune));
  });

  it('should ensure that the action FAILURE_GET_SEARCH_TERM is dispatched when the api call fails', () => {
    const res = getSongListGenerator.next().value;
    console.log(call(useApiSauce, null), 'in saga test file');
    expect(JSON.stringify(res)).toEqual(call(useApiSauce, JSON.stringify(null)));

    const errorRes = {
      message: 'Something unknown happens'
    };

    expect(getSongListGenerator.next(apiResponseGenerator(false, {}, errorRes))).toEqual(
      put(getErrorFromResponse(errorRes.message))
    );
  });

  it('should ensure that the action SUCESS_GET_SEARCH_TERM is dispatched when the api call succeeds', () => {
    const artistName = 'Arijit Singh';
    const getSongListGenerator = fetchDataFromItune(artistName);
    const res = getSongListGenerator.next().value;
    expect(JSON.stringify(res)).toEqual(call(useApiSauce, JSON.parse(JSON.stringify(artistName))));
    const apiResponse: SongData = {
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
    expect(getSongListGenerator.next(apiResponseGenerator(true, apiResponse))).toEqual(put(getDataToShow(apiResponse)));
  });
});
