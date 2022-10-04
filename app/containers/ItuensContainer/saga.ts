import { takeLatest, call, put } from 'redux-saga/effects';
import { getSearchTerm, getDataToShow, getErrorFromResponse } from './reducer';
import { getItune } from '../../services/apiUtils';

export function* fetchDataFromItune(action: any): Generator<any, any> {
  console.log('in fetch call');
  console.log('action', action);
  const { payload } = action;
  const res: any = yield call(getItune, payload);
  const { data, error, ok } = res;
  console.log(data, 'is saga');
  if (ok) {
    yield put(getDataToShow(data));
  } else {
    yield put(getErrorFromResponse(error));
  }
}

function* ituneCallSaga() {
  console.log('before fetch call function');
  yield takeLatest(getSearchTerm.toString(), fetchDataFromItune);
}

export default ituneCallSaga;
