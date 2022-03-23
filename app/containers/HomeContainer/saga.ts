import { put, call, takeLatest } from 'redux-saga/effects';
import { homeContainerTypes, homeContainerCreators } from './reducer';
import { DefaultActionTypes } from 'reduxsauce';
import { launch } from '.';
import { getQueryResponse } from '@app/utils/graphqlUtils';
import { GET_LAUNCHES } from './queries';

interface GetLaunchList {
  data: { launches: launch; errors: Object };
  ok: boolean;
}

const { REQUEST_GET_LAUNCH_LIST }: DefaultActionTypes = homeContainerTypes;
const { successGetLaunchList, failureGetLaunchList } = homeContainerCreators;
export function* getLaunchList(): Generator<any, any, GetLaunchList> {
  const response = yield call(getQueryResponse, GET_LAUNCHES);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetLaunchList(data));
  } else {
    yield put(failureGetLaunchList(data));
  }
}
// Individual exports for testing
export default function* homeContainerSaga() {
  yield takeLatest(REQUEST_GET_LAUNCH_LIST, getLaunchList);
}
