import { put, call, takeLatest } from 'redux-saga/effects';
import { getLaunches } from '@services/launchApi';
import { homeContainerTypes, homeContainerCreators } from './reducer';

const { REQUEST_GET_LAUNCH_LIST }: any = homeContainerTypes;
const { successGetLaunchList, failureGetLaunchList } = homeContainerCreators;
export function* getLaunchList(): any {
  const response = yield call(getLaunches);
  const { data, ok } = response;
  if (ok) {
    if (!data.errors) {
      yield put(successGetLaunchList(data));
    } else {
      yield put(failureGetLaunchList(data));
    }
  } else {
    yield put(failureGetLaunchList(data));
  }
}
// Individual exports for testing
export default function* homeContainerSaga() {
  yield takeLatest(REQUEST_GET_LAUNCH_LIST, getLaunchList);
}
