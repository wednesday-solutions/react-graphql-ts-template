// import { useApiSauce } from '@app/services/apiUtils';
// import { apiResponseGenerator } from '@app/utils/testUtils';
// import { takeLatest, call, put } from 'redux-saga/effects';
// import { getDataToShow, getSearchTerm } from '../reducer';
// import ituneCallSaga, { fetchDataFromItune } from '../saga';

// describe('ItuneContainer saga test', () => {
//   const generator = ituneCallSaga();
//   const getSongListGenerator = fetchDataFromItune({ payload: null });

//   it('should start the task to watch for REQUEST_GET_SEARCH_TERM action', () => {
//     expect(generator.next().value).toEqual(takeLatest(getSearchTerm.toString(), fetchDataFromItune));
//   });

//   it('should ensure that the action FAILURE_GET_SEARCH_TERM is dispatch when the api calls fails', () => {
//     const res = getSongListGenerator.next().value;
//     expect(res).toEqual(call(useApiSauce, null));
//   });

//   it('should ensure that the action SUCCESS_GET_SEARCH_TERM is dispatched when the api calls succeed', () => {
//     const artistName = 'Arijit Singh';
//     const getSongListGenerator = fetchDataFromItune({ payload: artistName });
//     const res = getSongListGenerator.next().value;
//     expect(res).toEqual(call(useApiSauce, artistName));
//   });

//   const apiResponse = {
//     resultCount: 50,
//     results: [
//       {
//         trackId: 1,
//         artistName: 'Yung Xiety',
//         artworkUrl100:
//           'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/3b/cc/31/3bcc315a-e58f-c678-8d05-b7d62346070f/1d724fe3-daaa-4825-91f0-a47e70a438bd.jpg/100x100bb.jpg',
//         collectionName: 'Arijit Singh (Mashup) - Single'
//       }
//     ]
//   };
// //   console.log(expect(getSongListGenerator.next(apiResponseGenerator(true, apiResponse)).value), ' is expected');
// //   console.log(put(getDataToShow(apiResponse)), 'is received');
//   expect(getSongListGenerator.next(apiResponseGenerator(true, apiResponse)).value).toEqual(
//     put(getDataToShow(apiResponse))
//   );
// });
import { call, put, takeLatest } from 'redux-saga/effects';
import { getSearchTerm, getDataToShow } from '../reducer';
import { apiResponseGenerator } from '../types';
import { useApiSauce } from '@app/services/apiUtils';
import ituneCallSaga, { fetchDataFromItune } from '../saga';

describe('ItuneContainer saga tests', () => {
  const generator = ituneCallSaga();
  const getSongListGenerator = fetchDataFromItune({ payload: null });
  it('should start the task to watch for GET_SEARCH_TERM action', () => {
    expect(generator.next().value).toEqual(takeLatest(getSearchTerm.toString(), fetchDataFromItune));
  });
  it('should ensure that the action FAILURE_GET_SEARCH_TERM is dispatched when the api calls fails', () => {
    const res = getSongListGenerator.next().value;
    expect(res).toEqual(call(useApiSauce, null));
  });
  it('should ensure that the action SUCCESS_GET_SEARCH_TEERM is dispatched when the api calls succeeds', () => {
    const artistName = 'Arijit Singh';
    const getSongListGenerator = fetchDataFromItune({ payload: artistName });
    const res = getSongListGenerator.next().value;
    expect(res).toEqual(call(useApiSauce, artistName));
    const apiResponse = [
      {
        trackId: 1,
        artistName: 'Yung Xiety',
        artworkUrl100:
          'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/3b/cc/31/3bcc315a-e58f-c678-8d05-b7d62346070f/1d724fe3-daaa-4825-91f0-a47e70a438bd.jpg/100x100bb.jpg',
        collectionName: 'Arijit Singh (Mashup) - Single'
      }
    ];
    expect(getSongListGenerator.next(apiResponseGenerator(true, apiResponse)).value).toEqual(
      put(getDataToShow(apiResponse))
    );
  });
});
