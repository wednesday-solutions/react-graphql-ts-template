import { getQueryResponse } from '@app/utils/graphqlUtils';
import { AnyAction } from 'redux';
import { call, takeLatest, put } from 'redux-saga/effects';
import { GET_LAUNCH } from './queries';
import { requestGetLaunch, successGetLaunch, failureGetLaunch } from './reducer';
import { LaunchResponse } from './types';

// Individual exports for testing
export function* getLaunch(action: AnyAction): Generator<any, any, LaunchResponse> {
  const response = yield call(getQueryResponse, GET_LAUNCH, { launchId: action.payload });

  const { ok, data, error } = response;

  if (ok) {
    yield put(successGetLaunch(data));
  } else {
    yield put(failureGetLaunch(error));
  }
}

export default function* launchDetailsSaga() {
  yield takeLatest(requestGetLaunch.toString(), getLaunch);
}
