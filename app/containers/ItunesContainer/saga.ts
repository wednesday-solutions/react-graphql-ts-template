import { takeLatest, call, put } from 'redux-saga/effects';
import { requestGetSongList, successGetSongList, failureGetSongList } from './reducer';
import { getItune } from '@services/apiUtils';

export function* fetchDataFromItune(action: any): Generator<any, any> {
  const res: any = yield call(getItune, action.payload);
  const { data, ok, error } = res;
  console.log(res);
  if (ok) {
    yield put(successGetSongList(data));
  } else {
    yield put(failureGetSongList(error));
  }
}

function* ituneCallSaga() {
  yield takeLatest(requestGetSongList.toString(), fetchDataFromItune);
}

export default ituneCallSaga;
