import { takeLatest, call, put } from 'redux-saga/effects';
import { requestGetSongList, successGetSongList, failureGetSongList } from '../SongProviderContainer/reducer';
import { getItune } from '@services/apiUtils';

export function* fetchDataFromItune(action: any): Generator<any, any> {
  const { artistName, pageNumber, pageSize } = action.payload ?? { artistName: '', pageNumber: 0, pageSize: 0 };
  const res: any = yield call(getItune, { artistName, pageNumber, pageSize });
  const { data, ok, error } = res;
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
