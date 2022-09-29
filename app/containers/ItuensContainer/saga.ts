import { takeLatest, call, put } from 'redux-saga/effects';
import { getSearchTerm, getDataToShow, getErrorFromResponse } from './reducer';
import useApiSauce from './apiUtils';
const apiCall = useApiSauce();

function* fetchData(action: any): Generator<any, any> {
  const res: any = yield call(apiCall, action.payload);
  const { data, error, ok } = res;
  if (ok) {
    yield put(getDataToShow(data.results));
  } else {
    yield put(getErrorFromResponse(error));
  }
}

function* ituneCallSaga() {
  console.log('in saga');
  yield takeLatest(getSearchTerm.toString(), fetchData);
  console.log('after fetch data');
}

export default ituneCallSaga;
