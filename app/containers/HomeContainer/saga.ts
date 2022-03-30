import { getQueryResponse } from '@app/utils/graphqlUtils';
import { GET_LAUNCHES } from './queries';
import { LAUNCH_PER_PAGE } from './usePaginate';
import { AnyAction } from 'redux';
import { put, call, takeLatest } from 'redux-saga/effects';
import { requestGetLaunchList, successGetLaunchList, failureGetLaunchList } from './reducer';
import { Launch } from '.';

interface LaunchesResponse {
  data: { launches?: Launch[] };
  error?: object;
  ok: boolean;
}

export interface RequestLaunchesActionPayload {
  missionName: string | null;
  order: string | null; // 'asc' | 'desc'
  page: number; // starts from 1
}

export type LaunchesActionCreator = (payload: RequestLaunchesActionPayload) => AnyAction;

interface LaunchesAction {
  payload: { missionName: any; order: any; page: any };
  type: string;
}

export function* getLaunchList(action: LaunchesAction): Generator<any, any, LaunchesResponse> {
  const { missionName, order, page } = action.payload;
  const response = yield call(getQueryResponse, GET_LAUNCHES, {
    missionName,
    order,
    sort: 'launch_date_local',
    limit: LAUNCH_PER_PAGE,
    offset: (page - 1) * LAUNCH_PER_PAGE
  });
  const { data, ok, error } = response;
  if (ok) {
    yield put(successGetLaunchList(data));
  } else {
    yield put(failureGetLaunchList(error));
  }
}

// Individual exports for testing
export default function* homeContainerSaga() {
  yield takeLatest(requestGetLaunchList.toString(), getLaunchList);
}
