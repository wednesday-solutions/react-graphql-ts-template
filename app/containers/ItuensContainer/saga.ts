import { put, takeLatest, call } from 'redux-saga/effects';
// import { initialState } from './reducer';
// import { create } from 'apisauce';
// import selectSearchTerm from './selector';
import { getQueryResponse } from '@app/utils/ituneGraphServer';
// `https://demo.dataverse.org/api/search?q=${value}`
// const getState = (state: any) => state.Itune.searchTerm;

// const api = create({ baseURL: 'https://itunes.apple.com' });
// const api = create({ baseURL: 'https://demo.dataverse.org' });

// const handleApiCall = async () => {
//   console.log('in API call');
//   console.log(selectSearchTerm(initialState));
//   console.log(selectSearchTerm);
//   const res = await api.any({ method: 'GET', url: `/search?term=${selectSearchTerm}` });
//   //   const res = await api.any({ method: 'GET', url: `/api/search?q=${Itune}` });
//   return res;
// };

function* fetchData(action: any): Generator<any, any> {
  const res: any = yield call(getQueryResponse, action.payload);
  const { data, error, ok } = res;
  if (ok) {
    yield put({ type: 'GET_SEARCH_DATA_SUCCESS', payload: data.results });
  } else {
    yield put({ type: 'GET_SEARCH_DATA_FAILED', error: error });
  }
}

function* mySaga() {
  yield takeLatest('GET_SEARCH_TERM', fetchData);
}

export default mySaga;
