import { takeLatest, call, put } from 'redux-saga/effects';
import { getSearchTerm, getDataToShow, getErrorFromResponse } from './reducer';
import { getItune } from '../../services/apiUtils';

export function* fetchDataFromItune(action: any): Generator<any, any> {
  const { payload } = action;
  const res: any = yield call(getItune, payload);
  const { data, error, ok } = res;
  if (ok) {
    yield put(getDataToShow(data));
  } else {
    yield put(getErrorFromResponse(error));
  }
}

function* ituneCallSaga() {
  yield takeLatest(getSearchTerm.toString(), fetchDataFromItune);
}

export default ituneCallSaga;
