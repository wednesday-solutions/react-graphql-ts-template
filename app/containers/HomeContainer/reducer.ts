import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';
import { Launch } from '@app/containers/HomeContainer';

export const { Types: homeContainerTypes, Creators: homeContainerCreators } = createActions({
  requestGetLaunchList: ['launchQuery'],
  successGetLaunchList: ['launchData'],
  failureGetLaunchList: ['launchListError'],
  clearLaunchList: {}
});
export const initialState = { launchQuery: null, launchData: {}, launchListError: null, loading: false };

export interface ReducerTypes {
  type?: string;
  somePayload?: string | null;
  launchQuery?: any;
  launchData?: {
    data: Launch;
    errors: Object;
  };
  launchListError?: string;
  loading: boolean;
}

export const homeContainerReducer = (state = initialState, action: ReducerTypes) =>
  produce(state, (draft: any) => {
    switch (action.type) {
      case homeContainerTypes.REQUEST_GET_LAUNCH_LIST:
        draft.loading = true;
        draft.launchQuery = action.launchQuery;
        break;
      case homeContainerTypes.CLEAR_LAUNCH_LIST:
        draft.launchQuery = null;
        draft.launchListError = null;
        draft.launchData = {};
        break;
      case homeContainerTypes.SUCCESS_GET_LAUNCH_LIST:
        draft.launchData = action?.launchData?.data;
        draft.loading = false;
        break;
      case homeContainerTypes.FAILURE_GET_LAUNCH_LIST:
        draft.loading = false;
        draft.launchListError = get(action?.launchData?.errors, 'message', 'something_went_wrong');
        break;
    }
  });

export default homeContainerReducer;
