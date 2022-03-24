import { put, call, takeLatest } from 'redux-saga/effects';
import { homeContainerTypes, homeContainerCreators } from './reducer';
import { DefaultActionTypes } from 'reduxsauce';
import { Launch } from '@app/containers/HomeContainer';
import { getQueryResponse } from '@app/utils/graphqlUtils';
import { GET_LAUNCHES } from './queries';

interface GetLaunchList {
  data: { launches: Launch; errors: Object };
  ok: boolean;
}

const { REQUEST_GET_LAUNCH_LIST }: DefaultActionTypes = homeContainerTypes;
const { successGetLaunchList, failureGetLaunchList } = homeContainerCreators;

export function* getLaunchList(action: { launchQuery: string; type: string }): Generator<any, any, GetLaunchList> {
  const response = yield call(getQueryResponse, GET_LAUNCHES, { missionName: action?.launchQuery });
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
