import { takeLatest, call, put } from 'redux-saga/effects';
import { getSearchTerm, getDataToShow, getErrorFromResponse } from './reducer';
import { useApiSauce } from '../../services/apiUtils';

export function* fetchDataFromItune(action: any): Generator<any, any> {
  const res: any = yield call(useApiSauce, action.payload);
  const { data, error, ok } = res;
  console.log(data);
  if (ok) {
    yield put(getDataToShow(data));
  } else {
    yield put(getErrorFromResponse(error));
  }
}

function* ituneCallSaga() {
  console.log(fetchDataFromItune({ payload: 'Arijit Singh' }).next().value);
  yield takeLatest(getSearchTerm.toString(), fetchDataFromItune);
}

export default ituneCallSaga;
